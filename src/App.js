import { useState, useEffect, useCallback } from "react";
import { Box, Text, Button } from "nonagon";
import Scrambo from "scrambo";
import "./App.css";

function App() {
  const [count, setCount] = useState(null);
  const [currentScramble, setCurrentScramble] = useState("");

  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem("count"));
    if (savedCount) setCount(savedCount);
    else setCount(0);
  }, []);

  useEffect(() => {
    if (count == null) return;
    localStorage.setItem("count", count);
    setCurrentScramble(new Scrambo().type("333").get(1)[0]);
  }, [count]);

  const increment = useCallback(() => setCount(count + 1), [count]);
  const decrement = useCallback(() => setCount(count - 1), [count]);

  const onKeyPressHandler = useCallback(
    (e) => {
      increment();
      if (e.code === "Backslash") setCount(0);
    },
    [increment]
  );

  useEffect(() => {
    document.body.addEventListener("keypress", onKeyPressHandler);
    return () =>
      document.body.removeEventListener("keypress", onKeyPressHandler);
  }, [increment, onKeyPressHandler]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 50,
      }}
    >
      <Text style={{ fontSize: 30 }}>{currentScramble}</Text>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button color="primary" label="-" size="large" onClick={decrement} />
        <Box style={{ display: "flex", padding: 20 }} elevated>
          <Text style={{ fontFamily: "RobotoMono NF" }} size={200}>
            {count}
          </Text>
        </Box>
        <Button color="primary" label="+" size="large" onClick={increment} />
      </Box>
    </Box>
  );
}

export default App;
