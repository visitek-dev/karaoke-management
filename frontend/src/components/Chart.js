import React, { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();

  const [TotalReceipts, setTotalReceipts] = useState([]);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(receiptActions.getAllNonPagination());
  // }, [dispatch]);

  const receipts = useSelector((state) => state.receipts);
  // let recentItems = [];
  // if (receipts.items)
  //   recentItems = receipts.items.filter(
  //     (x) => new Date(x.checkOutDate).getDate() > new Date().getDate() - 7
  //   );

  useEffect(() => {
    let weekReceipts = [];
    let totalReceipts = [];
    if (receipts.items) {
      for (let i = 0; i < 7; i++) {
        weekReceipts.push([]);
        totalReceipts.push([]);
        weekReceipts[weekReceipts.length - 1] = receipts.items.filter(
          (x) => new Date(x.checkOutDate).getDate() === new Date().getDate() - i
        );

        console.log(weekReceipts);
        let checkOutDate = (new Date().getDate() - i).toString();
        let total = 0;

        for (let i = 0; i < weekReceipts[weekReceipts.length - 1].length; i++) {
          total += parseFloat(weekReceipts[weekReceipts.length - 1][i].total);
        }

        totalReceipts[totalReceipts.length - 1] = createData(
          checkOutDate,
          Math.round(total)
        );
      }
      setTotalReceipts(totalReceipts.reverse());
    }
  }, [receipts.items]);

  // if (receipts.items) {
  //   for (let i = 0; i < 7; i++) {
  //     weekReceipts.push([]);
  //     weekReceipts[weekReceipts.length - 1] = receipts.items.filter(
  //       (x) => new Date(x.checkOutDate).getDate() > new Date().getDate() - i
  //     );
  //   }
  // }

  return (
    <React.Fragment>
      <Title>Total past 7 days</Title>
      <ResponsiveContainer>
        <LineChart
          data={TotalReceipts}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Total of receipts ($)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
