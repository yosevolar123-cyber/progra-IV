import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { supabase } from '../config/supabase.config';

export interface UserProfile {
  id: string;
  role: 'customer' | 'admin';
  name: string;
  created_at: string;
}

/**
 * Hardcoded admin credentials for local/fallback login when Supabase Auth
 * is unavailable or the email hasn't been confirmed yet.
 */
const LOCAL_ADMIN = {
  email: 'yosevolar123@gmail.com',
  password: '9398146',
  profile: {
    id: 'local-admin-001',
    role: 'admin' as const,
    name: 'admin',
    created_at: new Date().toISOString()
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$: Observable<UserProfile | null> = this.userProfileSubject.asObservable();

  constructor() {
    this.initializeSession();
  }

  private async initializeSession() {
    // Check for locally stored admin session first
    const localSession = sessionStorage.getItem('hirosima_admin_session');
    if (localSession) {
      try {
        const profile = JSON.parse(localSession) as UserProfile;
        this.userProfileSubject.next(profile);
        return;
      } catch {
        sessionStorage.removeItem('hirosima_admin_session');
      }
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await this.fetchUserProfile(session.user.id);
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          await this.fetchUserProfile(session.user.id);
        } else {
          // Don't clear local admin session on Supabase auth state changes
          if (!sessionStorage.getItem('hirosima_admin_session')) {
            this.userProfileSubject.next(null);
          }
        }
      });
    } catch (err) {
      console.warn('Supabase Auth initialization failed, local login available.', err);
    }
  }

  private async fetchUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        this.userProfileSubject.next(null);
        return null;
      }

      this.userProfileSubject.next(data as UserProfile);
      return data as UserProfile;
    } catch (err) {
      console.error('Exception fetching user profile:', err);
      this.userProfileSubject.next(null);
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    // First, try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!error && data?.user) {
        const profile = await this.fetchUserProfile(data.user.id);
        if (profile) {
          return { success: true };
        }
        // If profile fetch failed but auth worked, create a local admin profile
        // for the authenticated Supabase user
        if (email === LOCAL_ADMIN.email) {
          const adminProfile: UserProfile = {
            ...LOCAL_ADMIN.profile,
            id: data.user.id
          };
          this.userProfileSubject.next(adminProfile);
          sessionStorage.setItem('hirosima_admin_session', JSON.stringify(adminProfile));
          return { success: true };
        }
        return { success: true };
      }

      // If Supabase auth failed, try local fallback
      console.warn('Supabase Auth failed:', error?.message, '- Trying local fallback...');
    } catch (err: any) {
      console.warn('Supabase Auth exception:', err.message, '- Trying local fallback...');
    }

    // Fallback: local admin login (for dev or when email not confirmed)
    if (email === LOCAL_ADMIN.email && password === LOCAL_ADMIN.password) {
      console.log('✅ Local admin login successful');
      this.userProfileSubject.next(LOCAL_ADMIN.profile);
      sessionStorage.setItem('hirosima_admin_session', JSON.stringify(LOCAL_ADMIN.profile));
      return { success: true };
    }

    return { success: false, error: 'Credenciales inválidas. Verifica tu email y contraseña.' };
  }

  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore Supabase signout errors
    }
    sessionStorage.removeItem('hirosima_admin_session');
    this.userProfileSubject.next(null);
  }

  get currentUserProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  get isAdmin(): boolean {
    return this.userProfileSubject.value?.role === 'admin';
  }

  get isAuthenticated(): boolean {
    return this.userProfileSubject.value !== null;
  }
}
