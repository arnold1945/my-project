import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    age: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate("/loginsignup");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/users/profile/",
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://127.0.0.1:8000/users/profile/",
        profile,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      setProfile(res.data);
      setIsEditing(false); 
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MY PROFILE</h1>
      <h2>Welcome {user?.email}</h2>

      
      {!isEditing && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "400px",
            marginTop: "20px",
          }}
        >
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>

          <button onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}

      
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "400px",
            marginTop: "20px",
          }}
        >
          <input
            placeholder="First name"
            value={profile.first_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, first_name: e.target.value })
            }
          />

          <input
            placeholder="Last name"
            value={profile.last_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, last_name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Age"
            value={profile.age ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, age: e.target.value })
            }
          />

          <textarea
            placeholder="Short bio"
            value={profile.bio || ""}
            onChange={(e) =>
              setProfile({ ...profile, bio: e.target.value })
            }
          />

          <div style={{ marginTop: "10px" }}>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
