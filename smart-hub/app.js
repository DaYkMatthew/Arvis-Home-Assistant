const { useState, useEffect } = React;

// Icon components
const Tv = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
    <polyline points="17 2 12 7 7 2"/>
  </svg>
);

const Home = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const Settings = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
  </svg>
);

const User = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Lock = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ArrowLeft = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const Play = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const SkipForward = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 4 15 12 5 20 5 4"/>
    <line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
);

const Volume2 = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const Zap = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const Moon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const SmartHub = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [time, setTime] = useState(new Date());
  const correctPin = '0000';

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const preventDefault = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, []);

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setTimeout(() => {
            setIsLocked(false);
            setPin('');
          }, 200);
        } else {
          setShake(true);
          setTimeout(() => {
            setPin('');
            setShake(false);
          }, 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleLock = () => {
    setIsLocked(true);
    setCurrentPage('home');
    setPin('');
  };

  if (isLocked) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center select-none overflow-hidden">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-white mb-2">Smart Hub</h1>
          <p className="text-gray-400 text-xl">Enter PIN to unlock</p>
        </div>

        <div className={`flex gap-5 mb-16 ${shake ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                i < pin.length
                  ? 'bg-blue-500 border-blue-500'
                  : shake
                  ? 'border-red-500'
                  : 'border-gray-500'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-3xl font-light transition-all duration-100 border-2 border-gray-700 active:scale-95"
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleNumberClick('0')}
            className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-3xl font-light transition-all duration-100 border-2 border-gray-700 active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-24 h-24 rounded-full bg-gray-800 active:bg-gray-600 text-white text-2xl transition-all duration-100 border-2 border-gray-700 active:scale-95"
          >
            ⌫
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'home') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-hidden">
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-light text-white">Smart Hub</h1>
            <button
              onClick={handleLock}
              className="p-4 rounded-full bg-gray-800 active:bg-gray-700 transition-all border-2 border-gray-700 active:scale-95"
            >
              <Lock className="w-7 h-7 text-gray-300" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-5">
            <button
              onClick={() => setCurrentPage('tv')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-blue-500 transition-all duration-100 flex flex-col items-center justify-center gap-4 active:scale-95"
            >
              <Tv className="w-20 h-20 text-blue-400" />
              <span className="text-3xl font-light text-white">TV</span>
            </button>

            <button
              onClick={() => setCurrentPage('daily')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-green-500 transition-all duration-100 flex flex-col items-center justify-center gap-4 active:scale-95"
            >
              <Home className="w-20 h-20 text-green-400" />
              <span className="text-3xl font-light text-white">Home</span>
            </button>

            <button
              onClick={() => setCurrentPage('settings')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-purple-500 transition-all duration-100 flex flex-col items-center justify-center gap-4 active:scale-95"
            >
              <Settings className="w-20 h-20 text-purple-400" />
              <span className="text-3xl font-light text-white">Settings</span>
            </button>

            <button
              onClick={() => setCurrentPage('user')}
              className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 active:border-orange-500 transition-all duration-100 flex flex-col items-center justify-center gap-4 active:scale-95"
            >
              <User className="w-20 h-20 text-orange-400" />
              <span className="text-3xl font-light text-white">User</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const PageHeader = ({ title, color }) => (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={() => setCurrentPage('home')}
        className="p-4 rounded-full bg-gray-800 active:bg-gray-700 transition-all border-2 border-gray-700 active:scale-95"
      >
        <ArrowLeft className="w-7 h-7 text-gray-300" />
      </button>
      <h1 className={`text-4xl font-light text-${color}-400 flex-1`}>{title}</h1>
      <button
        onClick={handleLock}
        className="p-4 rounded-full bg-gray-800 active:bg-gray-700 transition-all border-2 border-gray-700 active:scale-95"
      >
        <Lock className="w-7 h-7 text-gray-300" />
      </button>
    </div>
  );

  if (currentPage === 'tv') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-6">
          <PageHeader title="Media & TV" color="blue" />
          
          <div className="mb-6 p-6 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h2 className="text-2xl font-light text-white">Now Playing</h2>
            </div>
            <p className="text-xl text-gray-300 mb-2">Not Connected</p>
            <p className="text-lg text-gray-500">Connect Spotify to see what's playing</p>
          </div>

          <div className="mb-6 p-6 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-2xl font-light text-white mb-4">Spotify</h2>
            <div className="flex gap-4 justify-center mb-6">
              <button className="p-5 rounded-full bg-gray-700 active:bg-gray-600 border-2 border-gray-600 active:scale-95">
                <SkipForward className="w-8 h-8 text-white transform rotate-180" />
              </button>
              <button className="p-6 rounded-full bg-green-600 active:bg-green-700 border-2 border-green-500 active:scale-95">
                <Play className="w-10 h-10 text-white" />
              </button>
              <button className="p-5 rounded-full bg-gray-700 active:bg-gray-600 border-2 border-gray-600 active:scale-95">
                <SkipForward className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <Volume2 className="w-6 h-6 text-gray-400" />
              <input type="range" className="flex-1 h-3 rounded-full" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-2xl font-light text-white mb-4">Apple TV</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-5 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">
                <Zap className="w-6 h-6 mx-auto mb-2" />
                Wake
              </button>
              <button className="p-5 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">
                <Moon className="w-6 h-6 mx-auto mb-2" />
                Sleep
              </button>
              <button className="p-5 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">
                <Play className="w-6 h-6 mx-auto mb-2" />
                Play/Pause
              </button>
              <button className="p-5 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">
                <Tv className="w-6 h-6 mx-auto mb-2" />
                TV App
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'daily') {
    const formatTime = (date) => {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-6">
          <PageHeader title="Daily Dashboard" color="green" />
          
          <div className="mb-6 p-8 rounded-2xl bg-gray-800 border-2 border-gray-700 text-center">
            <div className="text-7xl font-light text-white mb-2">{formatTime(time)}</div>
            <div className="text-2xl text-gray-400">{formatDate(time)}</div>
          </div>

          <div className="mb-6 p-6 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-2xl font-light text-white mb-4">Quick Timers</h2>
            <div className="grid grid-cols-4 gap-3">
              <button className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">5m</button>
              <button className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">10m</button>
              <button className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">30m</button>
              <button className="p-4 rounded-xl bg-gray-700 active:bg-gray-600 border-2 border-gray-600 text-white text-lg active:scale-95">60m</button>
            </div>
          </div>

          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-700/50">
            <h2 className="text-2xl font-light text-white mb-4">Quote of the Day</h2>
            <p className="text-xl text-gray-200 italic mb-3">"The only way to do great work is to love what you do."</p>
            <p className="text-lg text-gray-400">— Steve Jobs</p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-800 border-2 border-gray-700">
            <h2 className="text-2xl font-light text-white mb-4">Event Countdowns</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-gray-700 border-2 border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl text-white">Weekend</span>
                  <span className="text-2xl font-light text-green-400">2d 14h</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'settings') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-6">
          <PageHeader title="Settings" color="purple" />
          
          <div className="space-y-4">
            <button className="w-full p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-2xl text-white mb-1">Change PIN</div>
              <div className="text-lg text-gray-400">Update your unlock PIN</div>
            </button>
            
            <button className="w-full p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-2xl text-white mb-1">Brightness</div>
              <div className="text-lg text-gray-400">Day / Night presets</div>
            </button>
            
            <button className="w-full p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-2xl text-white mb-1">Display</div>
              <div className="text-lg text-gray-400">Keep screen on while charging</div>
            </button>
            
            <button className="w-full p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-2xl text-white mb-1">About</div>
              <div className="text-lg text-gray-400">Device info & version</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'user') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none overflow-y-auto">
        <div className="p-6">
          <PageHeader title="User & Utilities" color="orange" />
          
          <div className="mb-6 p-8 rounded-2xl bg-gradient-to-br from-orange-900/40 to-red-900/40 border-2 border-orange-600">
            <h2 className="text-3xl font-light text-white mb-2 text-center">Find My Phone</h2>
            <p className="text-lg text-gray-300 mb-6 text-center">Ring your Razr Ultra</p>
            <button className="w-full p-6 rounded-xl bg-orange-600 active:bg-orange-700 border-2 border-orange-500 text-white text-2xl font-light active:scale-95 transition-all">
              <AlertCircle className="w-10 h-10 mx-auto mb-2" />
              Ring Phone Now
            </button>
          </div>

          <div className="space-y-4">
            <button onClick={handleLock} className="w-full p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-2xl text-white mb-1">Lock Screen</div>
              <div className="text-lg text-gray-400">Return to PIN screen</div>
            </button>
            
            <button className="w-full p-6 rounded-2xl bg-gray-800 border-2 border-gray-700 active:bg-gray-750 text-left active:scale-98 transition-all">
              <div className="text-2xl text-white mb-1">PC Controls</div>
              <div className="text-lg text-gray-400">Wake, sleep, lock your computer</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SmartHub />);
