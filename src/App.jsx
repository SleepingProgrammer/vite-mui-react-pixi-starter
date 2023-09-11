import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import muiLogo from "/mui.svg";
import { Button, Typography, Box, Link, Grid, Tooltip } from "@mui/joy";
import { Add } from "@mui/icons-material";
import { Container, Stage } from "@pixi/react";

import Circle from "./components/Circle";
import Rectangle from "./components/Rectangle";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [enemies, setEnemies] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    //Spawn enemies
    const interval = setInterval(() => {
      setEnemies((enemies) => [
        ...enemies,
        {
          x: Math.random() * 800,
          y: Math.random() * 600,
          radius: 50,
          color: 0xff0000,
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    console.log({
      e,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setMousePosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleShot = () => {
    //check collision
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const dx = mousePosition.x - enemy.x;
      const dy = mousePosition.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.radius) {
        //collision detected
        console.log("collision detected");
        setEnemies((enemies) => enemies.filter((e) => e !== enemy));
        setPoints((_points) => _points + 1);
      }
    }
  };

  return (
    <Box
      container
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#060a0e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography level="h1" color="primary">
        Vite + MUI/Joy + React/Pixi
      </Typography>
      <Typography level="h2" color="primary">
        Points: {points}
      </Typography>
      <Stage
        style={{
          cursor: "none",
        }}
        width={800}
        height={600}
        onPointerMove={handleMouseMove}
        onPointerDown={handleShot}
      >
        <Container width={800} height={600}>
          {enemies.map((enemy, index) => (
            <Circle
              key={index}
              x={enemy.x}
              y={enemy.y}
              radius={enemy.radius}
              color={enemy.color}
            />
          ))}

          <Rectangle
            x={mousePosition.x - 5}
            y={mousePosition.y - 5}
            width={10}
            height={10}
            color={0x00ff00}
          />
        </Container>
      </Stage>
    </Box>
  );
}

export default App;
