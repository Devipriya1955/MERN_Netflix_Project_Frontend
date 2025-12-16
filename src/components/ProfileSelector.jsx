import { useState, useEffect } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import api from '../utils/api';

const ProfileSelector = ({ onSelectProfile, currentProfile }) => {
  const [profiles, setProfiles] = useState([]);
  const [showManage, setShowManage] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newProfileName, setNewProfileName] = useState('');

  const defaultAvatars = [
    'https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e',
    'https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofcaEODjeQpZYvMxdntOzaOmewhVn8qtLwjDp_ijcCiCv8Zb5ZLuaEqAeEuQkQyPOzgBQ.png?r=bd7',
    'https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlJFKtLKgjNlbBHsuoqiiy5sHSMKa149ml2m5ZF1N0VcXvDMT0lvoHJpfrHlF7W1KHOg.png?r=54d',
    'https://occ-0-2851-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABcYjyCkf5csZGysp4jEI2z3QXZ_t8kYh_c-d2ZI8KnewtGrDmUVChDOcf1GoEjvzwa4RzAyn7bOZjQXKdpXNBan-bRHs1DqBrnda.png?r=e6e'
  ];

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await api.get('/user/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      // Create default profile if none exist
      setProfiles([{
        _id: 'default',
        name: 'Profile 1',
        avatar: defaultAvatars[0],
        isKids: false
      }]);
    }
  };

  const createProfile = async () => {
    if (!newProfileName.trim()) return;
    
    try {
      const response = await api.post('/user/profiles', {
        name: newProfileName,
        avatar: defaultAvatars[profiles.length % defaultAvatars.length],
        isKids: false
      });
      setProfiles([...profiles, response.data]);
      setNewProfileName('');
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const updateProfile = async (profileId, updates) => {
    try {
      await api.put(`/user/profiles/${profileId}`, updates);
      setProfiles(profiles.map(p => p._id === profileId ? { ...p, ...updates } : p));
      setEditingProfile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const deleteProfile = async (profileId) => {
    if (profiles.length <= 1) return; // Don't delete last profile
    
    try {
      await api.delete(`/user/profiles/${profileId}`);
      setProfiles(profiles.filter(p => p._id !== profileId));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  if (showManage) {
    return (
      <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-4xl lg:text-6xl font-light mb-8">Manage Profiles</h1>
        
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {profiles.map((profile) => (
            <div key={profile._id} className="text-center group">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-md cursor-pointer hover:ring-4 hover:ring-white transition-all"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                  <FaEdit className="text-white text-2xl" />
                </div>
              </div>
              
              {editingProfile === profile._id ? (
                <div className="mt-4">
                  <input
                    type="text"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 rounded text-center"
                    placeholder={profile.name}
                    autoFocus
                  />
                  <div className="flex justify-center space-x-2 mt-2">
                    <button
                      onClick={() => updateProfile(profile._id, { name: newProfileName })}
                      className="bg-white text-black px-4 py-1 rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProfile(null)}
                      className="bg-gray-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-white text-lg lg:text-xl">{profile.name}</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <button
                      onClick={() => {
                        setEditingProfile(profile._id);
                        setNewProfileName(profile.name);
                      }}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      Edit
                    </button>
                    {profiles.length > 1 && (
                      <button
                        onClick={() => deleteProfile(profile._id)}
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {profiles.length < 5 && (
            <div className="text-center">
              <div
                onClick={() => setNewProfileName('')}
                className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <FaPlus className="text-gray-400 text-4xl" />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Add Profile"
                  className="bg-gray-800 text-white px-3 py-2 rounded text-center"
                  onKeyPress={(e) => e.key === 'Enter' && createProfile()}
                />
                {newProfileName && (
                  <button
                    onClick={createProfile}
                    className="block mx-auto mt-2 bg-white text-black px-4 py-1 rounded text-sm"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowManage(false)}
          className="text-gray-400 hover:text-white text-lg border border-gray-400 hover:border-white px-8 py-2 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-4xl lg:text-6xl font-light mb-8">Who's watching?</h1>
      
      <div className="flex flex-wrap justify-center gap-8">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            onClick={() => onSelectProfile(profile)}
            className="text-center cursor-pointer group"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-md group-hover:ring-4 group-hover:ring-white transition-all"
            />
            <p className="text-white text-lg lg:text-xl mt-4 group-hover:text-gray-300 transition-colors">
              {profile.name}
            </p>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setShowManage(true)}
        className="text-gray-400 hover:text-white text-lg mt-8 border border-gray-400 hover:border-white px-8 py-2 transition-colors"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelector;