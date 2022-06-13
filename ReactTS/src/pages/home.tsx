export default function HomePage() {
  return (
    <>
      <div className="default">
          <a href="https://unsplash.com/@fakurian" className="credits">
            Milad Fakurian - Unsplash
          </a>
        <div className="box">
          <h1>Hello 👋</h1>
          <p>Personal File Structure Below</p>
          <ul>
            <li>
              <span>src/pages</span> ~ All Your Pages
            </li>
            <li>
              <span>src/styling</span> ~ Css Styling
            </li>
            <li>
              <span>src/typings/index.d.ts</span> ~ Types
            </li>
            <li>
              <span>src/lib</span> ~ Modules, Classes, Api's etc
            </li>
            <li>
              <span>src/components </span>~ Well, Components
            </li>
          </ul>
          <a href="https://github.com/Saigees/Templates" className="btn">
            Created Using Saige's Templates
          </a>
        </div>
      </div>
    </>
  );
}
