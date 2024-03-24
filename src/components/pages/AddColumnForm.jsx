import React, { useState } from 'react';
import { supabase } from "../../../supabase";

const AddColumnForm = () => {
  const [columnName, setColumnName] = useState('');
  const [dataType, setDataType] = useState('text');

  const handleColumnNameChange = (e) => {
    setColumnName(e.target.value);
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const handleAddColumn = async (e) => {
    e.preventDefault();
    try {
      // Construct the SQL query to alter table schema
      const sql = `ALTER TABLE items ADD COLUMN ${columnName} ${dataType}`;
      const { error } = await supabase.from('items').execute(sql);
      if (error) {
        throw error;
      }
      alert('Column added successfully!');
    } catch (error) {
      console.error('Error adding column:', error.message);
      alert('Error adding column. Please check console for details.');
    }
  };

  return (
    <form onSubmit={handleAddColumn}>
      <div>
        <label>
          Column Name:
          <input type="text" value={columnName} onChange={handleColumnNameChange} />
        </label>
      </div>
      <div>
        <label>
          Data Type:
          <select value={dataType} onChange={handleDataTypeChange}>
            <option value="text">Text</option>
            <option value="integer">Integer</option>
            {/* Add other data types as needed */}
          </select>
        </label>
      </div>
      <button type="submit">Add Column</button>
    </form>
  );
};

export default AddColumnForm;
