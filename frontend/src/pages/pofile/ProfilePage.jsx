import "./ProfilePage.css";
import { ChevronLeft } from "lucide-react";

import { useAuthStore } from "../../store/authStore.js";

import { Link } from "react-router";
import { useState } from "react";

function ProfilePage() {
  const { authUser, isUpdatingProfileImage, updateProfile } = useAuthStore();
  const [ selectedImage, setSelectedImage ] = useState(null);

  const handleUploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfile({ profileImage: base64Image });
      };
    } catch (error) {}
  };
  return (
    <>
      <main id="profile-page-main-container">
        <Link to="/" id="profile-page-back-link">
          <ChevronLeft />
          Acceuil
        </Link>
        <div id="profile-page-profile-container">
          <div id="profile-page-profile-image-container">
            <label
              id="profile-page-profile-image-label"
              htmlFor="avatar-upload"
            >
              <img
                src={selectedImage ||authUser.profileImage || "/avatar.png"}
                alt="Profile Image"
                id="profile-page-profile-image"
              />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleUploadImage}
                disabled={isUpdatingProfileImage}
              />
            </label>
          </div>
          <div id="profile-page-profile-information-container">
            <p id="profile-page-profile-username">
              Nom d'utilisateur : {authUser.username}
            </p>
            <p id="profile-page-profile-email">Email : {authUser.email}</p>
            <p id="profile-page-profile-social-link">Liens sociaux : level {authUser.socialLinks}</p>
          </div>
          <div>
            <p id="profile-page-profile-created-at">
              Ce compte à été créer le : {authUser.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
