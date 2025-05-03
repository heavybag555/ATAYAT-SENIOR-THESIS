"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Script from "next/script";
import Head from "next/head";

export default function LoadingScreen() {
  const router = useRouter();
  const initialized = useRef(false);

  useEffect(() => {
    // Only add event listeners once
    if (!initialized.current) {
      initialized.current = true;

      // Add the loading screen styles from style.css
      const style = document.createElement("style");
      style.textContent = `
        @font-face {
          font-family: "Web437_Cordata_PPC-400";
          src: url("/fonts/Web437_Cordata_PPC-400.woff") format("woff");
          font-weight: normal;
          font-style: normal;
        }
        
        body.loading-screen {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 100vh;
          padding: 25px 0;
          box-sizing: border-box;
        }
        
        .loading-headings {
          text-align: center;
          font-family: "Web437_Cordata_PPC-400", monospace;
          padding: 0 20px;
          z-index: 10;
        }
        
        .loading-h1 {
          font-size: 12pt;
          color: rgb(120, 192, 224);
          margin: 0;
          padding: 0;
          letter-spacing: 2px;
        }
        
        .loading-h2 {
          font-size: 12pt;
          color: rgb(50, 50, 50);
          opacity: 1;
          margin: 0;
          padding-top: 3px;
          letter-spacing: 2px;
        }
        
        #sketch-holder {
          width: 800px;
          height: 800px;
          margin: 0 auto;
          max-width: 100%;
        }
        
        canvas {
          display: block;
          width: 800px;
          max-width: 100%;
          height: auto;
          image-rendering: pixelated;
          filter: brightness(1.2) contrast(1.1) saturate(1.1);
        }
        
        .neon-button {
          font-family: "Web437_Cordata_PPC-400", monospace;
          font-size: 10pt;
          color: rgb(120, 192, 224);
          background-color: black;
          border: 1px solid rgb(120, 192, 224);
          padding: 6px 12px 4px 12px;
          border-radius: 20px;
          text-decoration: none;
          display: inline-block;
          margin: 0;
          letter-spacing: 2px;
          cursor: pointer;
        }
        
        .neon-button:hover {
          border-color: black;
          background-color: rgb(120, 192, 224);
          color: black;
          cursor: pointer;
          transition: all 0.1s ease;
        }
        
        .clock-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin: 0 auto;
        }
        
        .side-text {
          display: flex;
          align-items: center;
          width: 150px;
        }
        
        .side-text:first-child {
          justify-content: flex-end;
        }
        
        .side-text:last-child {
          justify-content: flex-start;
        }
        
        @media screen and (max-width: 900px) {
          #sketch-holder {
            width: 100%;
            height: auto;
          }
          
          canvas {
            width: 100%;
          }
          
          .clock-container {
            flex-direction: column;
            gap: 10px;
          }
          
          .side-text {
            display: none;
          }
        }
        
        @media screen and (max-width: 600px) {
          .loading-h1 {
            font-size: 10pt;
          }
          
          .loading-h2 {
            font-size: 8pt;
          }
          
          .loading-container {
            padding: 15px 0;
          }
        }
      `;
      document.head.appendChild(style);

      // Add a class to the body to apply the loading screen styles
      document.body.classList.add("loading-screen");

      // Set up space bar event and enter button click
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          const enterButton = document.getElementById("enter-archive");
          if (enterButton) {
            enterButton.click();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        document.body.classList.remove("loading-screen");
        document.removeEventListener("keydown", handleKeyDown);
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };
    }
  }, []);

  // Function to navigate to the grid page
  const enterArchive = () => {
    router.push("/grid");
  };

  return (
    <>
      <Head>
        <title>A TALE AS YOUNG AS TIME</title>
      </Head>

      {/* P5.js Script */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"
        strategy="beforeInteractive"
      />

      {/* Custom P5.js Sketch */}
      <Script id="loading-sketch" strategy="afterInteractive">
        {`
          let font;
          let matrix = [];
          const fontSize = 20;
          const characters = "INLAND-EMPIRE-BORN-A-TALE-AS-YOUNG-AS-TIME";
          let columns;
          let rows;
          let scanLine = 0;
          let trail = [];
          const maxTrailLength = 20;
          let isAnimating = true;
          let lastMouseAngle = 0;
          let clockwise = true;
          let timeOffset = 0;
          let rgbOffset = 3;
          let scanlineAlpha = 100;
          const NEON_COLOR = [120, 192, 224];
          let lastBuffer;
          let strokeEnabled = false;
          
          let realTimeData = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            isApiTime: false,
          };
          
          function preload() {
            console.log("Loading font...");
            font = loadFont("/fonts/Web437_Cordata_PPC-400.woff");
          }
          
          async function fetchPSTTime() {
            try {
              const response = await fetch(
                "http://worldtimeapi.org/api/timezone/America/Los_Angeles"
              );
              if (!response.ok) throw new Error("API response error");
          
              const data = await response.json();
              const date = new Date(data.datetime);
          
              realTimeData.hours = date.getHours();
              realTimeData.minutes = date.getMinutes();
              realTimeData.seconds = date.getSeconds();
              realTimeData.isApiTime = true;
              updateTimeDisplay();
              console.log(
                "Successfully fetched PST time:",
                \`\${realTimeData.hours}:\${realTimeData.minutes}\`
              );
            } catch (error) {
              console.error(
                "Failed to fetch PST time, using local time as fallback:",
                error
              );
              useFallbackTime();
            }
          }
          
          function useFallbackTime() {
            const options = {
              timeZone: "America/Los_Angeles",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false,
            };
          
            const pstTime = new Date().toLocaleString("en-US", options);
            const [hours, minutes, seconds] = pstTime.split(":").map(Number);
          
            realTimeData.hours = hours;
            realTimeData.minutes = minutes;
            realTimeData.seconds = seconds;
            realTimeData.isApiTime = false;
            updateTimeDisplay();
          }
          
          function setup() {
            let canvas = createCanvas(800, 800);
            canvas.parent("sketch-holder");
          
            isAnimating = true;
          
            columns = floor(width / fontSize);
            rows = floor(height / fontSize);
          
            for (let i = 0; i < rows; i++) {
              matrix[i] = {
                x: random(-500, 0),
                speed: random(0.2, 0.8),
                chars: [],
              };
              for (let j = 0; j < columns; j++) {
                matrix[i].chars[j] = characters[j % characters.length];
              }
            }
          
            lastMouseX = mouseX;
            lastMouseAngle = 0;
          
            fetchPSTTime();
            setInterval(fetchPSTTime, 60000);
          
            lastBuffer = createGraphics(800, 800);
            mainBuffer = createGraphics(800, 800);
            clockMask = createGraphics(800, 800);
            vignette = createGraphics(width, height);
          
            vignette.noFill();
            for (let i = 0; i < 100; i++) {
              let alpha = map(i, 0, 100, 0, 50);
              vignette.stroke(0, alpha);
              vignette.strokeWeight(2);
              vignette.ellipse(width / 2, height / 2, width - i * 5, height - i * 5);
            }
          }
          
          let mainBuffer, clockMask, vignette;
          
          function draw() {
            if (!isAnimating) {
              background(0);
              mainBuffer.clear();
              clockMask.clear();
              clockMask.background(0);
              clockMask.noFill();
              clockMask.stroke(255);
              clockMask.strokeWeight(30);
          
              let clockX = width / 2;
              let clockY = height / 2;
              let clockSize = min(width, height) * 0.75;
          
              clockMask.circle(clockX, clockY, clockSize);
          
              drawClockHand(clockMask, lastMouseAngle, "hour", clockSize * 0.33);
              drawClockHand(clockMask, timeOffset, "minute", clockSize * 0.42);
              drawClockHand(clockMask, timeOffset * 60, "second", clockSize * 0.47);
          
              mainBuffer.push();
              for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                  let x = (matrix[i].x + j * fontSize) % width;
          
                  if (x >= 0 && x < width) {
                    let pixelColor = clockMask.get(x, i * fontSize);
                    if (pixelColor[0] > 0) {
                      mainBuffer.fill(NEON_COLOR[0], NEON_COLOR[1], NEON_COLOR[2]);
                      mainBuffer.stroke(
                        NEON_COLOR[0],
                        NEON_COLOR[1] - 50,
                        NEON_COLOR[2] - 30
                      );
                      mainBuffer.strokeWeight(1);
          
                      mainBuffer.textFont(font);
                      mainBuffer.textSize(fontSize);
                      mainBuffer.text(matrix[i].chars[j], x, i * fontSize);
                    }
                  }
                }
              }
              mainBuffer.pop();
          
              image(mainBuffer, 0, 0);
          
              push();
              blendMode(ADD);
              tint(NEON_COLOR[0], NEON_COLOR[1], NEON_COLOR[2]);
              image(mainBuffer, 0, 0);
              tint(NEON_COLOR[0] / 6, NEON_COLOR[1] / 6, NEON_COLOR[2] / 6);
              image(mainBuffer, -rgbOffset, 0);
              image(mainBuffer, rgbOffset, 0);
              pop();
              noTint();
          
              for (let y = 0; y < height; y += 4) {
                stroke(0, scanlineAlpha);
                line(0, y, width, y);
              }
          
              image(vignette, 0, 0);
          
              return;
            }
          
            background(0);
          
            mainBuffer.clear();
            clockMask.clear();
          
            clockMask.background(0);
            clockMask.noFill();
            clockMask.stroke(255);
            clockMask.strokeWeight(30);
          
            let clockX = width / 2;
            let clockY = height / 2;
            let clockSize = min(width, height) * 0.75;
          
            clockMask.circle(clockX, clockY, clockSize);
          
            let mouseAngle = atan2(mouseY - clockY, mouseX - clockX);
            let angleDiff = mouseAngle - lastMouseAngle;
          
            if (angleDiff !== 0) {
              if (angleDiff > PI) angleDiff -= TWO_PI;
              if (angleDiff < -PI) angleDiff += TWO_PI;
              clockwise = angleDiff > 0;
          
              timeOffset += clockwise ? 1 : -1;
            }
            lastMouseAngle = mouseAngle;
          
            drawClockHand(clockMask, mouseAngle, "hour", clockSize * 0.33);
            drawClockHand(clockMask, timeOffset, "minute", clockSize * 0.42);
            drawClockHand(clockMask, timeOffset * 60, "second", clockSize * 0.47);
          
            mainBuffer.push();
            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < columns; j++) {
                let x = (matrix[i].x + j * fontSize) % width;
          
                if (x >= 0 && x < width) {
                  let pixelColor = clockMask.get(x, i * fontSize);
                  if (pixelColor[0] > 0) {
                    mainBuffer.fill(NEON_COLOR[0], NEON_COLOR[1], NEON_COLOR[2]);
                    if (!isAnimating) {
                      mainBuffer.stroke(
                        NEON_COLOR[0],
                        NEON_COLOR[1] - 50,
                        NEON_COLOR[2] - 30
                      );
                      mainBuffer.strokeWeight(1);
                    } else {
                      mainBuffer.noStroke();
                    }
          
                    if (abs(i * fontSize - scanLine) < fontSize) {
                      mainBuffer.fill(
                        NEON_COLOR[0],
                        NEON_COLOR[1] + 30,
                        NEON_COLOR[2] + 10
                      );
                    }
                    mainBuffer.textFont(font);
                    mainBuffer.textSize(fontSize);
                    mainBuffer.text(matrix[i].chars[j], x, i * fontSize);
                  }
                }
              }
              if (isAnimating) {
                matrix[i].x += matrix[i].speed;
              }
            }
            mainBuffer.pop();
          
            lastBuffer.copy(mainBuffer, 0, 0, width, height, 0, 0, width, height);
          
            image(mainBuffer, 0, 0);
          
            push();
            blendMode(ADD);
            tint(NEON_COLOR[0], NEON_COLOR[1], NEON_COLOR[2]);
            image(mainBuffer, 0, 0);
            tint(NEON_COLOR[0] / 6, NEON_COLOR[1] / 6, NEON_COLOR[2] / 6);
            image(mainBuffer, -rgbOffset, 0);
            image(mainBuffer, rgbOffset, 0);
            pop();
            noTint();
          
            for (let y = 0; y < height; y += 4) {
              stroke(0, scanlineAlpha);
              line(0, y, width, y);
            }
          
            image(vignette, 0, 0);
          
            scanLine += 10;
            if (scanLine > height) scanLine = 0;
          }
          
          function drawClockHand(g, value, type, length) {
            let angle;
          
            if (type === "hour") {
              angle = value;
            } else {
              if (type === "minute") {
                let minutes;
                if (realTimeData.isApiTime) {
                  minutes = realTimeData.minutes;
                } else {
                  minutes = (minute() + timeOffset) % 60;
                }
                if (minutes < 0) minutes += 60;
                angle = map(minutes, 0, 60, -HALF_PI, TWO_PI - HALF_PI);
              } else {
                let seconds;
                if (realTimeData.isApiTime) {
                  seconds = realTimeData.seconds;
                } else {
                  seconds = (second() + timeOffset * 60) % 60;
                }
                if (seconds < 0) seconds += 60;
                angle = map(seconds, 0, 60, -HALF_PI, TWO_PI - HALF_PI);
              }
            }
          
            g.push();
            g.translate(width / 2, height / 2);
            g.rotate(angle);
            g.stroke(255);
            g.strokeWeight(30);
            g.line(0, 0, 0, -length);
            g.pop();
          }
          
          function resizeCanvas(w, h) {
            if (w !== width || h !== height) {
              p5.prototype.resizeCanvas.call(window, w, h);
          
              columns = floor(width / fontSize);
              rows = floor(height / fontSize);
          
              lastBuffer = createGraphics(width, height);
              mainBuffer = createGraphics(width, height);
              clockMask = createGraphics(width, height);
              vignette = createGraphics(width, height);
          
              vignette.noFill();
              for (let i = 0; i < 100; i++) {
                let alpha = map(i, 0, 100, 0, 50);
                vignette.stroke(0, alpha);
                vignette.strokeWeight(2);
                vignette.ellipse(width / 2, height / 2, width - i * 5, height - i * 5);
              }
          
              console.log("Canvas resized to", w, "x", h);
            }
          }
          
          function windowResized() {
            console.log("Window resized event detected");
          }
          
          function keyPressed() {
            if (keyCode === 32) {
              isAnimating = !isAnimating;
          
              if (!isAnimating) {
                redraw();
              }
              return false;
            }
          }
          
          function updateTimeDisplay() {
            const timeElement = document.getElementById("pst-time");
            if (timeElement) {
              let hours = realTimeData.hours;
              let ampm = hours >= 12 ? "PM" : "AM";
          
              hours = hours % 12;
              hours = hours ? hours : 12;
          
              let timeString = \`\${hours.toString()}:\${realTimeData.minutes
                .toString()
                .padStart(2, "0")} \${ampm}\`;
              timeElement.textContent = timeString;
            }
          }
          
          // Add debounce function
          function debounce(func, wait) {
            let timeout;
            return function () {
              clearTimeout(timeout);
              timeout = setTimeout(func, wait);
            };
          }
          
          window.addEventListener("load", function () {
            const resizeObserver = new ResizeObserver(
              debounce(function () {
                const sketchHolder = document.getElementById("sketch-holder");
                if (sketchHolder && window.resizeCanvas) {
                  const width = Math.min(800, sketchHolder.clientWidth);
                  const height = width;
                  window.resizeCanvas(width, height);
                }
              }, 250)
            );
          
            const sketchHolder = document.getElementById("sketch-holder");
            if (sketchHolder) {
              resizeObserver.observe(sketchHolder);
            }
          });
        `}
      </Script>

      <div className="loading-container">
        <div className="loading-headings">
          <h1 className="loading-h1">A-TALE-AS-YOUNG-AS-TIME</h1>
          <br />
          <h2 className="loading-h2">
            A-BUM-DIARY-PHOTO-ARCHIVE-AND-MEMORY-CAPSULE
          </h2>
          <h2 className="loading-h2">FOR-US-BY-US</h2>
          <h2 className="loading-h2">INLAND-EMPIRE-CA</h2>
          <h2 className="loading-h2">BROOKLYN-NY</h2>
        </div>
        <div className="clock-container">
          <div className="side-text">
            <span className="neon-button" id="pst-time">
              00:00
            </span>
          </div>
          <div id="sketch-holder">{/* p5 canvas will be created here */}</div>
          <div className="side-text">
            <a href="https://thebumdiary.com" className="neon-button">
              BUM-DIARY
            </a>
          </div>
        </div>
        <div className="loading-headings">
          <h2 className="loading-h2">CLICK-SPACEBAR-TO-LIVE-IN-THE-MOMENT</h2>
          <br />
        </div>
        <button
          id="enter-archive"
          className="neon-button"
          onClick={enterArchive}
        >
          ENTER-ARCHIVE
        </button>
      </div>
    </>
  );
}
