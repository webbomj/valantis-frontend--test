import ContentLoader from "react-content-loader";
import css from "./index.module.scss";

export const MyLoader = () => (
  <div className={css.wrapper}>
    <ContentLoader
      speed={2}
      width={220}
      height={200}
      viewBox="0 0 220 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="48" y="15" rx="3" ry="3" width="140" height="15" />
      <rect x="69" y="163" rx="3" ry="3" width="100" height="25" />
      <rect x="48" y="37" rx="3" ry="3" width="140" height="15" />
      <rect x="49" y="58" rx="3" ry="3" width="140" height="15" />
    </ContentLoader>
  </div>
);
