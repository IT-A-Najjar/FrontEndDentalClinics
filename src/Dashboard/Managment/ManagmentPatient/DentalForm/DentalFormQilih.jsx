import React, { useState } from 'react';
import './DentalForm.css';

const DentalFormQilih = ({ onSelectionChange }) => {
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

      for (let j = 1; j <= 1; j++) {
         const toothLabel1 = i.toString() + j.toString();
         let toothLabel = toothLabel1;
         if (toothLabel1 === "11") {
            toothLabel = "امامي";
         } else if(toothLabel1 === "21"){
            toothLabel = "نصف فك";
         } else if(toothLabel1 === "31"){
            toothLabel = "فك";
         }else {
            toothLabel = "فول ماوث";
         }
         const isSelected = selectedTeeth.includes(toothLabel);

         const toothClassName = `tooth1 ${isSelected ? 'selected' : ''}`;

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
         <h2>المداواة اللبية </h2>
         <table>
            <tbody>{teethRows}</tbody>
         </table>
      </div>
   );
};

export default DentalFormQilih;
