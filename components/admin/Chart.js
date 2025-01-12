import { useEffect, useRef, useState } from "react";

import { Chart } from "chart.js/auto";

const ChartDisplay = () => {
  const [data, setData] = useState(null);

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API}/admin/home`);

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();

      if (lineChartRef.current) lineChartRef.current.destroy();



      const barCtx = document.getElementById("barChart").getContext("2d");

      barChartRef.current = new Chart(barCtx, {
        type: "bar",

        data: {
          labels: [
            "Category",
            "Customer",
            "Invoice",
            "Invoice Details",
            "Payment",
            "Product",
            "purchases",
            "subscription",

            "Supplier",
            "Unit",
          ],
          // Define labels for the X-axis (categories being represented in the bar chart).
          datasets: [
            {
              label: "Counts",
              // Label for the dataset (this appears in the chart legend).
              data: [
                data.categorycount,
                data.customercount,
                data.invoicecount,
                data.invoicedetailscount,
                data.paymentcount,
                data.productcount,

                data.purchasescount,
                data.subscriptioncount,

                data.suppliercount,
                data.unitcount,
              ],
              // Data points for each category; dynamically fetched from the API response.
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#36A2EB",
                "#FF6384",
                "#36A2EB",
              ],
              // Define a unique background color for each bar.
            },
          ],
        },
      });

      const pieCtx = document.getElementById("pieChart").getContext("2d");

      pieChartRef.current = new Chart(pieCtx, {
        type: "pie",

        data: {
          labels: [
            "Category",
            "Customer",
            "Invoice",
            "Invoice Details",
            "Payment",
            "Product",
            "purchases",
            "subscription",

            "Supplier",
            "Unit",
          ],
          // Define labels for the X-axis (categories being represented in the bar chart).
          datasets: [
            {
              label: "Counts",
              // Label for the dataset (this appears in the chart legend).
              data: [
                data.categorycount,
                data.customercount,
                data.invoicecount,
                data.invoicedetailscount,
                data.paymentcount,
                data.productcount,

                data.purchasescount,
                data.subscriptioncount,

                data.suppliercount,
                data.unitcount,
              ],
              // Data points for each category; dynamically fetched from the API response.
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#C9CBCF",
                "#36A2EB",
                "#FF6384",
                "#36A2EB",
              ],
              // Define a unique background color for each bar.
            },
          ],
        },
      });



    

 
    const lineCtx = document.getElementById("lineChart").getContext("2d");
   
    lineChartRef.current = new Chart(lineCtx, {
   
      type: "line",
     
      data: {
        labels: [
          "Category",
          "Customer",
          "Invoice",
          "Invoice Details",
          "Payment",
          "Product",
          "purchases",
          "subscription",

          "Supplier",
          "Unit",
        ],
        // Define labels for the X-axis (categories being represented in the bar chart).
        datasets: [
          {
            label: "Counts",
            // Label for the dataset (this appears in the chart legend).
            data: [
              data.categorycount,
              data.customercount,
              data.invoicecount,
              data.invoicedetailscount,
              data.paymentcount,
              data.productcount,

              data.purchasescount,
              data.subscriptioncount,

              data.suppliercount,
              data.unitcount,
            ],
            // Data points for each category; dynamically fetched from the API response.
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#36A2EB",
              "#FF6384",
              "#36A2EB",
            ],
            // Define a unique background color for each bar.
          },
        ],
      },
    });



    }
  }, [data]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bar Chart</h2>

      <canvas id="barChart"></canvas>

      <h2>Pie Chart</h2>
      <div style={{ height: "900px" }}>
        <canvas id="pieChart"></canvas>
      </div>

      <h2>Line Chart</h2>
    

      <div 
      style={{ backgroundColor: "#f5f5f5", 
      padding: "20px", borderRadius: "8px" }}
      >
      <canvas id="lineChart"></canvas>
    </div>
    </div>
  );
};

export default ChartDisplay;
