import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

export const ScratchCard1 = ({ reward, onReveal }) => {
  const [scratched, setScratched] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [revealAnimationComplete, setRevealAnimationComplete] = useState(false);
  const scratchedPoints = useRef(new Set()).current;
  const animation = useRef(new Animated.Value(0)).current;

  // Virtual grid for tracking scratched areas (10x10 grid = 100 cells)
  const GRID_SIZE = 10;
  const CELL_WIDTH = CARD_WIDTH / GRID_SIZE;
  const CELL_HEIGHT = CARD_HEIGHT / GRID_SIZE;

  // Create pan responder for tracking scratch gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (event) => {
        if (scratched) return;

        // Get absolute position of the touch
        const { locationX, locationY } = event.nativeEvent;

        // Convert absolute position to relative position on card
        const relativeX = Math.floor(locationX / CELL_WIDTH);
        const relativeY = Math.floor(locationY / CELL_HEIGHT);

        // Ensure we're within bounds
        if (
          relativeX >= 0 &&
          relativeX < GRID_SIZE &&
          relativeY >= 0 &&
          relativeY < GRID_SIZE
        ) {
          // Add this point to our scratched set
          const pointKey = `${relativeX}-${relativeY}`;
          scratchedPoints.add(pointKey);

          // Calculate percentage scratched
          const percentage =
            (scratchedPoints.size / (GRID_SIZE * GRID_SIZE)) * 100;
          setScratchPercentage(percentage);

          // If we've scratched more than 50%, reveal the whole card
          if (percentage > 50 && !scratched) {
            setScratched(true);
            // Animated reveal
            Animated.timing(animation, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setRevealAnimationComplete(true);
              if (onReveal) onReveal(reward);
            });
          }
        }
      },
    })
  ).current;

  // Define opacity for the scratch layer
  const scratchLayerOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // Define scale animation for reward reveal
  const rewardScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <View style={styles.container}>
      {/* Card title */}
      <Text style={styles.cardTitle}>Scratch to reveal your reward!</Text>

      <View style={styles.cardContainer}>
        {/* Reward content (hidden behind scratch layer) */}
        <Animated.View
          style={[
            styles.rewardContainer,
            { transform: [{ scale: rewardScale }] },
          ]}
        >
          <Text style={styles.rewardTitle}>Congratulations!</Text>
          <Text style={styles.rewardText}>{reward}</Text>
          <Image
            source={require("../assets/images/eReview-icon.png")} // Replace with your celebration image
            style={styles.celebrationImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Scratch layer */}
        {!revealAnimationComplete && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.scratchLayer,
              {
                opacity: scratchLayerOpacity,
              },
            ]}
          >
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={0}
            />
            <View style={styles.scratchInstructions}>
              <Text style={styles.scratchText}>
                {scratched ? "Revealing your reward..." : "Scratch here!"}
              </Text>
              {!scratched && (
                <Text style={styles.progressText}>
                  {Math.round(scratchPercentage)}% scratched
                </Text>
              )}
            </View>
          </Animated.View>
        )}
      </View>

      {revealAnimationComplete && (
        <Text style={styles.enjoyCoupon}>
          Your reward is ready to use in Google Pay!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a73e8", // Google Blue
    textAlign: "center",
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "#fff",
    position: "relative",
  },
  rewardContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0fe", // Light Google Blue
    padding: 20,
  },
  rewardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a73e8", // Google Blue
    marginBottom: 10,
  },
  rewardText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#202124", // Google Gray
    textAlign: "center",
    marginBottom: 10,
  },
  scratchLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#dadce0", // Google Gray background
    alignItems: "center",
    justifyContent: "center",
    // Adding a pattern texture to make it look like a scratch card
    borderWidth: 1,
    borderColor: "#dadce0",
  },
  scratchInstructions: {
    alignItems: "center",
  },
  scratchText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a73e8", // Google Blue
  },
  progressText: {
    fontSize: 14,
    color: "#5f6368", // Google Gray
    marginTop: 5,
  },
  celebrationImage: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  enjoyCoupon: {
    marginTop: 20,
    fontSize: 16,
    color: "#1a73e8", // Google Blue
    fontWeight: "500",
  },
});

import React, { useRef, useEffect, useState } from "react";

export const ScratchCard2 = ({ width, height, rewardImage }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Draw the blur/mask
    ctx.fillStyle = "#ccc"; // Grey color (or load a blurred image)
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const scratch = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out"; // ERASE mode
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false); // Circle scratch
    ctx.fill();
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <img
        src={rewardImage}
        alt="Reward"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={scratch}
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchMove={scratch}
      />
    </div>
  );
};

<ScratchCard1
  width={300}
  height={300}
  rewardImage="https://your-reward-image-url.com/reward.png"
/>;

import React, { useRef, useEffect, useState } from "react";

export const ScratchCard3 = ({
  width,
  height,
  rewardImage,
  threshold = 60,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // Draw blurred reward image
    const img = new Image();
    img.src = rewardImage;
    img.onload = () => {
      ctx.filter = "blur(10px)"; // Apply blur effect
      ctx.drawImage(img, 0, 0, width, height);
      ctx.filter = "none"; // reset filter
    };
  }, [rewardImage, width, height]);

  const startDrawing = (e) => {
    if (isRevealed) return;
    setIsDrawing(true);
    scratch(e);
  };

  const endDrawing = () => {
    if (isRevealed) return;
    setIsDrawing(false);
    checkScratched();
  };

  const scratch = (e) => {
    if (!isDrawing || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, false); // Brush size = 25
    ctx.fill();
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let total = 0;
    let cleared = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      total++;
      if (imageData.data[i + 3] === 0) {
        // alpha channel
        cleared++;
      }
    }

    const percentage = (cleared / total) * 100;
    setScratchedPercentage(percentage.toFixed(2));

    if (percentage > threshold) {
      revealReward();
    }
  };

  const revealReward = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Remove all mask
    setIsRevealed(true);
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <img
        src={rewardImage}
        alt="Reward"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, borderRadius: "12px" }}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={scratch}
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchMove={scratch}
      />
      {/* Debug info: */}
      {/* <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
        Scratched: {scratchedPercentage}%
      </div> */}
    </div>
  );
};

<ScratchCard
  width={300}
  height={300}
  rewardImage="https://yourdomain.com/reward.png"
  threshold={60} // Auto reveal after 60% scratch
/>;

import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti"; // Make sure you install: npm install canvas-confetti

export const ScratchCard4 = ({
  width,
  height,
  rewardImage,
  threshold = 60,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [isThresholdReached, setIsThresholdReached] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // Draw blurred reward image
    const img = new Image();
    img.src = rewardImage;
    img.onload = () => {
      ctx.filter = "blur(10px)"; // Apply blur
      ctx.drawImage(img, 0, 0, width, height);
      ctx.filter = "none"; // Reset filter
    };
  }, [rewardImage, width, height]);

  const startDrawing = (e) => {
    if (isRevealed) return;
    setIsDrawing(true);
    scratch(e);
  };

  const endDrawing = () => {
    if (isRevealed) return;
    setIsDrawing(false);
    checkScratched();
  };

  const scratch = (e) => {
    if (!isDrawing || isRevealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2, false); // Brush size = 25
    ctx.fill();
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let total = 0;
    let cleared = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      total++;
      if (imageData.data[i + 3] === 0) {
        // Alpha channel
        cleared++;
      }
    }

    const percentage = (cleared / total) * 100;
    setScratchedPercentage(percentage.toFixed(2));

    if (percentage > threshold && !isThresholdReached) {
      setIsThresholdReached(true);
    }
  };

  const revealReward = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsRevealed(true);
    launchConfetti();
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div style={{ position: "relative", width, height }}>
      <img
        src={rewardImage}
        alt="Reward"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "12px",
          }}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={scratch}
          onTouchStart={startDrawing}
          onTouchEnd={endDrawing}
          onTouchMove={scratch}
        />
      )}
      {/* Reveal Button */}
      {isThresholdReached && !isRevealed && (
        <button
          onClick={revealReward}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "#ff4081",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          Reveal Now
        </button>
      )}
    </div>
  );
};

export default ScratchCard;

            import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const VoucherPreview = ({ htmlContent }) => {
  const { width } = Dimensions.get('window'); // Get device width

  const injectedCSS = `
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f5f5f5;
      }
      img, iframe {
        max-width: 100%;
        height: auto;
      }
      * {
        box-sizing: border-box;
      }
    </style>
  `;

  const fullHtml = `
    <html>
      <head>${injectedCSS}</head>
      <body>${htmlContent}</body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: fullHtml }}
        style={{ width: width - 32, height: 400 }} // you can dynamically set height if needed
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default VoucherPreview;

import VoucherPreview from './VoucherPreview';

const html = `
  <div style="padding: 20px; text-align: center;">
    <h1>Congrats!</h1>
    <p>You have won a 50% off voucher!</p>
    <img src="https://yourdomain.com/voucher-image.png" style="width: 100%;" />
  </div>
`;

<VoucherPreview htmlContent={html} />
