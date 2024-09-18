import React, { useState, useEffect } from 'react';
import "./dashboard.css"
import ChartWidget from './ChartWidget';

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    {
      category: 'CNAPP Dashboard',
      widgets: [
        {
          name: 'CSPM Executive Dashboard',
          type: 'Cloud Accounts',
          content: 'Connected (2)\nNot Connected (2)'
        },
        {
          name: 'Cloud Account Risk Assessment',
          type: 'Pie Chart',
          content: 'Failed (968)\nWarning (688)\nNot detected (18)\nPassed (7913)'
        }
      ]
    },
    {
      category: 'CWPP Dashboard',
      widgets: [
        {
          name: 'Top 5 Namespace Specific Alerts',
          type: 'Bar Chart',
          content: 'No Graph data available'
        },
        {
          name: 'Workload Alerts',
          type: 'Line Chart',
          content: 'No Graph data available'
        }
      ]
    },
    {
      category: 'Registry Scan',
      widgets: [
        {
          name: 'Image Risk Assessment',
          type: 'Bar Chart',
          content: 'Critical (30)\nHigh (363)'
        },
        {
          name: 'Image Security Issues',
          type: 'Bar Chart',
          content: 'Critical (2)\nHigh (32)'
        }
      ]
    }
  ]);

  const [newWidget, setNewWidget] = useState({
    name: '',
    type: '',
    content: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleWidgetChange = (e) => {
    setNewWidget({ ...newWidget, [e.target.name]: e.target.value });
  };

  const addWidget = (category) => {
    if (newWidget.name && newWidget.type && newWidget.content) {
      const updatedWidgets = [...widgets];
      const categoryIndex = updatedWidgets.findIndex(
        (c) => c.category === category
      );
      updatedWidgets[categoryIndex].widgets.push({
        ...newWidget,
        category
      });
      setWidgets(updatedWidgets);
      setNewWidget({ name: '', type: '', content: '' });
    } else {
      alert('Please fill in all fields before creating a new widget.');
    }
  };

  const removeWidget = (category, index) => {
    const updatedWidgets = [...widgets];
    const categoryIndex = updatedWidgets.findIndex(
      (c) => c.category === category
    );
    updatedWidgets[categoryIndex].widgets.splice(index, 1);
    setWidgets(updatedWidgets);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredWidgets = widgets.filter((category) => {
    return category.widgets.some((widget) => {
      return (
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        widget.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });

  return (
    <div className="dashboard">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="widget-list">
        {filteredWidgets.map((category, categoryIndex) => (
          <div key={categoryIndex} className="category">
            <h2>{category.category}</h2>
            <div className="widget-container">
              {category.widgets.map((widget, widgetIndex) => (
                <div key={widgetIndex} className="widget">
                  <h3>{widget.name}</h3>
                  <p>{widget.type}</p>
                  <pre>{widget.content}</pre>
                  <button
                    onClick={() => removeWidget(category.category, widgetIndex)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="add-widget">
              <input
                type="text"
                placeholder="Widget Name"
                name="name"
                value={newWidget.name}
                onChange={handleWidgetChange}
              />
              <input
                type="text"
                placeholder="Widget Type"
                name="type"
                value={newWidget.type}
                onChange={handleWidgetChange}
              />
              <textarea
                placeholder="Widget Content"
                name="content"
                value={newWidget.content}
                onChange={handleWidgetChange}
              />
              <button onClick={() => addWidget(category.category)}>
                Add Widget
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;