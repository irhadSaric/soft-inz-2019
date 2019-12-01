import * as React from "react";

const Link = props => {
  const {
    router,
    path,
    onClick,
    children,
    visible = true,
    disabled = false,
    ...otherProps
  } = props;
  const handleClick = event => {
    if (onClick) {
      return onClick(event);
    }

    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    if (path) {
      return router.push({
        pathname: path
      });
    }
  };
  if (!visible) {
    return null;
  }
  return !disabled ? (
    <a href={path} {...otherProps} onClick={handleClick}>
      {children}
    </a>
  ) : (
    <span>{children}</span>
  );
};

export default Link;
