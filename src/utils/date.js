import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns"; // Register the adapter

Chart.register(...registerables); // Register all chart elements
