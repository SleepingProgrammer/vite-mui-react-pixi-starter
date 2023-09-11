import React, { useCallback } from "react";
import { Graphics } from "@pixi/react";

export default function Rectangle(props) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(props.color);
      g.drawRect(props.x, props.y, props.width, props.height);

      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
}
