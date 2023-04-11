function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <div
        styles={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <iframe src="main/index.html" allowFullScreen={true}></iframe>
      </div>
    </div>
  );
}

export default HomePage;
