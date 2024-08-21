import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setFilter } from './action';
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import './index.css';
const Plot = createPlotlyComponent(Plotly);

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);
  const filter = useSelector((state) => state.dashboard.filter);

  const [userFilter, setUserFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    dispatch(setFilter({ user: userFilter, category: categoryFilter }));
  }, [userFilter, categoryFilter]);

  const filteredData = data.filter((item) => {
    return (
      (!userFilter || item.user === userFilter) &&
      (!categoryFilter || item.category === categoryFilter)
    );
  });

  const tableData = filteredData.map((item) => (
    <tr>
      <td>{item.name}</td>
      <td>{item.value}</td>
    </tr>
  ));

  const pieChartData = filteredData.map((item) => ({
    labels: [item.name],
    values: [item.value],
    type: 'pie',
  }));

  const showTable = categoryFilter !== ''; // Show table when category filter is applied

  return (
    <div>
      <h1>My Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Filter by user"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
      </div>
      {showTable ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      ) : (
        <Plot data={pieChartData} layout={{ title: 'Pie Chart' }} />
      )}
    </div>
  );
};

export default Dashboard;