function App() {
  return (
    <>
      <div style={{ width: 200 }}>
        <a href={browser.runtime.getURL("/dashboard.html")} target="_blank">
          ダッシュボードを開く
        </a>
      </div>
    </>
  );
}

export default App;
