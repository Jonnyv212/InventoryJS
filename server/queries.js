const fullInventory = () => {
  const query = `SELECT INVENTORY.INVENTORY_ID, EQUIPMENT.EQUIPMENT_NAME, 
  CATEGORY.CATEGORY_NAME, PROJECT.PROJECT_NAME, INVENTORY.TERM_ID, INVENTORY.INVENTORY_DATE
  FROM EQUIPMENT 
  JOIN INVENTORY ON INVENTORY.EQUIPMENT_ID = EQUIPMENT.EQUIPMENT_ID 
  JOIN CATEGORY ON CATEGORY.CATEGORY_ID = EQUIPMENT.CATEGORY_ID 
  JOIN PROJECT ON PROJECT.PROJECT_ID = INVENTORY.PROJECT_ID
  WHERE INVENTORY.STATUS = '1'
  ORDER BY TO_NUMBER(INVENTORY_ID)`;
  return query;
};

const allProjects = () => {
  const query = `SELECT * FROM PROJECT WHERE PROJECT_NAME != 'Unassigned' AND PROJECT.STATUS = '1'`;
  return query;
};

const queryList = {
  q_inventory: fullInventory(),
  q_projects: allProjects()
};
module.exports = queryList;

// return (
//   <>
//     <span>ID: {item.INVENTORY_ID} </span>
//     <br />

//     <span>Equipment: {item.EQUIPMENT_NAME}</span>
//     <br />

//     <span>Category: {item.CATEGORY_NAME}</span>
//     <br />

//     <span>Project: {item.PROJECT_NAME}</span>
//     <br />

//     <span>Term ID: {item.TERM_ID}</span>
//     <br />

//     <span>Date: {item.INVENTORY_DATE}</span>
//     <br />
//   </>
// );
