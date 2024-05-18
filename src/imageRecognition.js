const tf = require("@tensorflow/tfjs-node");
const fs = require("fs").promises;

// Load the model
async function loadModel() {
  const model = await tf.loadGraphModel("file://path/to/model.json");
  return model;
}

// Image recognition function
async function recognizeFood(imagePath, model) {
  try {
    // Read the image file
    const imageBuffer = await fs.readFile(imagePath);
    const imageTensor = tf.node.decodeImage(imageBuffer);

    // Preprocess the image (resize, normalize, etc.)
    const processedImage = preprocessImage(imageTensor);

    // Perform inference to get predictions
    const predictions = await model.predict(processedImage);

    // Extract the predicted classes
    const predictedClasses = getPredictedClasses(predictions);

    return predictedClasses;
  } catch (error) {
    console.error("Error recognizing food:", error);
    throw new Error("Error recognizing food");
  }
}

// Preprocess the image
function preprocessImage(imageTensor) {
  // Perform necessary preprocessing such as resizing, normalization, etc.
  // Example: Resize image to expected input size of the model
  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
  // Normalize pixel values
  const normalizedImage = resizedImage.div(tf.scalar(255.0));
  // Add batch dimension
  const batchedImage = normalizedImage.expandDims(0);

  return batchedImage;
}

// Get predicted classes
function getPredictedClasses(predictions) {
  // Parse the predictions to get the top predicted classes
  // Example: Extract top 3 predicted classes
  const topPredictions = predictions.argMax(1).dataSync();

  // Convert top predictions to class labels
  // Example: Map class indices to class labels using a mapping dictionary
  const classLabels = mapIndicesToLabels(topPredictions);

  return classLabels;
}

// Map class indices to class labels
function mapIndicesToLabels(indices) {
  // Example: Use a mapping dictionary to map indices to class labels
  const mapping = {
    0: "apple_pie",
    1: "chocolate_cake",
    // Add more mappings as needed
  };

  // Map indices to labels
  const labels = indices.map((index) => mapping[index]);

  return labels;
}

// Example usage
(async () => {
  const model = await loadModel();
  const imagePath = "path/to/image.jpg";
  const predictedClasses = await recognizeFood(imagePath, model);
  console.log("Predicted food classes:", predictedClasses);
})();
