import React, { useState } from 'react';
import './DentalForm.css';

const DentalFormPulp = ({ onSelectionChange }) => {
   const [selectedTeeth, setSelectedTeeth] = useState([]);

   const handleToothClick = (toothLabel) => {
      const updatedSelectedTeeth = [...selectedTeeth];
      const toothIndex = updatedSelectedTeeth.indexOf(toothLabel);

      if (toothIndex === -1) {
         updatedSelectedTeeth.push(toothLabel);
      } else {
         updatedSelectedTeeth.splice(toothIndex, 1);
      }

      setSelectedTeeth(updatedSelectedTeeth);

      // ابعث المصفوفة المحدثة إلى الكومبوننت الأعلى
      onSelectionChange(updatedSelectedTeeth);
   };

   const getSelectedTeeth = () => {
      console.log('الأسنان المحددة: ' + selectedTeeth.join(', '));
   };

   // مثال على كيفية إضافة الأسنان داخل الجدول
   const teethRows = [];

   for (let i = 1; i <= 4; i++) {
      const row = [];

      for (let j = 1; j <= 5; j++) {
         const toothLabel = i.toString() + j.toString();
         const isSelected = selectedTeeth.includes(toothLabel);

         const toothClassName = `tooth ${isSelected ? 'selected' : ''}`;

         row.push(
            <td className='td-table-tooth' key={toothLabel} onClick={() => handleToothClick(toothLabel)}>
               <input
                  type="checkbox"
                  id={`tooth${toothLabel}-checkbox`}
                  checked={isSelected}

               />
               <div className={toothClassName}>
                  <div className="tooth-label">{toothLabel}</div>
               </div>
            </td>
         );
      }

      teethRows.push(<tr key={`row${i}`}>{row}</tr>);
   }

   return (
      <div>
         <h2>المداواة اللبية أمامية</h2>
         <table>
            <tbody>{teethRows}</tbody>
         </table>
      </div>
   );
};

export default DentalFormPulp;
