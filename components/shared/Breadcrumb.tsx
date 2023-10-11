import { Children, Fragment } from "react";

const Breadcrumb = ({ children }: any) => {
  const childrenArray = Children.toArray(children);
  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment  key={index + 23}>
          {child}
          <span>/</span>
        </Fragment>
      );
    }
    return child
  });

  return (
    <nav className="mx-4 mt-8">
      <ul className="flex items-center space-x-4 list-none">{childrenWtihSeperator}</ul>
    </nav>
  );
};

export default Breadcrumb;
