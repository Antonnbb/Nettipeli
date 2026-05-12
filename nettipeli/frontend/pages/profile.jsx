import Navbar from "./navbar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>👤 Profile</h1>

        {!user ? (
          <p>Not logged in</p>
        ) : (
          <>
            <h2>{user.username}</h2>

            <p>User ID: {user.id}</p>

            {/* tänne myöhemmin stats */}
          </>
        )}
      </div>
    </>
  );
}