import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, setFilter } from './action'; // Update to actions.js
import Plotly from 'plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import './index.css';

const Plot = createPlotlyComponent(Plotly);

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

  const [userFilter, setUserFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, ); 

  useEffect(() => {
    dispatch(setFilter({ user: userFilter, category: categoryFilter }));
  }, [dispatch, userFilter, categoryFilter]);

  const filteredData = filterData(data, userFilter, categoryFilter); 

  const tableData = filteredData.map((item) => (
    <tr>
      <td>{item.user}</td>
      <td>{item.category}</td>
      <td>{item.details}</td>
    </tr>
  ));

  const pieChartData = filteredData.map((item) => ({
    labels: [item.category], 
    values: [item.count], 
    type: 'pie',
  }));

  const showTable = categoryFilter !== '';

  return (
    <div>
      <center>
        <h1>My Dashboard</h1>
      </center>
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
              <th>id</th>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      ) : (
        <Plot data={pieChartData} layout={{ title: 'DATA' }} />
      )}
    </div>
  );
};


const filterData = (data, userFilter, categoryFilter) => {
  return data.filter((item) => {
    return (
      (!userFilter || item.user.toLowerCase().includes(userFilter.toLowerCase())) &&
      (!categoryFilter || item.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    );
  });
};

export default Dashboard;