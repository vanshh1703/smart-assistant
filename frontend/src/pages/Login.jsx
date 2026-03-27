import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in with:', { email, password, rememberMe });
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white flex-col justify-between p-12">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✨</span>
            </div>
            <span className="font-semibold text-lg">SPAI</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Your AI
            <br />
            Project
            <br />
            Partner.
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed max-w-sm">
            Experience a workspace that curates your data, summarizes your meetings, and intelligently manages your projects.
          </p>
        </div>

        {/* Bottom Section with Image and Components */}
        <div className="space-y-6">
          {/* Glass building image */}
          <div className="bg-gray-200 rounded-lg h-40 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop"
              alt="Office workspace"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Component names on gradient background */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 flex gap-8">
            <span className="text-gray-400 font-semibold">LUMINA</span>
            <span className="text-gray-400 font-semibold">AXON</span>
            <span className="text-gray-400 font-semibold">VERTEX</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-12 py-12">
        <div className="max-w-md mx-auto w-full">
          {/* Welcome Text */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Please enter your details to sign in.</p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-8 py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <div className="w-5 h-5 bg-gray-900 rounded"></div>
            <span className="font-medium text-gray-900">Continue with Google</span>
          </button>

          {/* OR EMAIL divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm font-medium">OR EMAIL</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-700">
                  PASSWORD
                </label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember for 30 days
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-8"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 mt-12 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
