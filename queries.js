// import {Component} from React;

// class QueryList extends Component {

const fullInventory = () => {
  const query = `SELECT INVENTORY.INVENTORY_ID, EQUIPMENT.EQUIPMENT_NAME, 
  CATEGORY.CATEGORY_NAME, PROJECT.PROJECT_NAME, INVENTORY.TERM_ID, INVENTORY.DATE
  FROM INVENTORYJS.EQUIPMENT 
  JOIN INVENTORYJS.INVENTORY ON INVENTORY.EQUIPMENT_ID = EQUIPMENT.EQUIPMENT_ID 
  JOIN INVENTORYJS.CATEGORY ON CATEGORY.CATEGORY_ID = EQUIPMENT.CATEGORY_ID 
  JOIN INVENTORYJS.PROJECT ON PROJECT.PROJECT_ID = INVENTORY.PROJECT_ID
  WHERE INVENTORY.STATUS = '1'
  ORDER BY INVENTORY.INVENTORY_ID ASC`;
  return query;
};

const getInventoryID = ID => {
  const query =
    `SELECT INVENTORY.INVENTORY_ID, EQUIPMENT.EQUIPMENT_NAME, 
  CATEGORY.CATEGORY_NAME, PROJECT.PROJECT_NAME, INVENTORY.TERM_ID, INVENTORY.DATE
  FROM INVENTORYJS.EQUIPMENT 
  JOIN INVENTORYJS.INVENTORY ON INVENTORY.EQUIPMENT_ID = EQUIPMENT.EQUIPMENT_ID 
  JOIN INVENTORYJS.CATEGORY ON CATEGORY.CATEGORY_ID = EQUIPMENT.CATEGORY_ID 
  JOIN INVENTORYJS.PROJECT ON PROJECT.PROJECT_ID = INVENTORY.PROJECT_ID
  WHERE INVENTORY.STATUS = '1' AND INVENTORY_ID = ` +
    ID +
    `
  ORDER BY INVENTORY_ID ASC`;
  return query;
};

const fullInventorySearch = (filter, search) => {
  const query =
    `SELECT INVENTORY.INVENTORY_ID, EQUIPMENT.EQUIPMENT_NAME, 
  CATEGORY.CATEGORY_NAME, PROJECT.PROJECT_NAME, INVENTORY.TERM_ID, INVENTORY.DATE
  FROM INVENTORYJS.EQUIPMENT 
  JOIN INVENTORYJS.INVENTORY ON INVENTORY.EQUIPMENT_ID = EQUIPMENT.EQUIPMENT_ID 
  JOIN INVENTORYJS.CATEGORY ON CATEGORY.CATEGORY_ID = EQUIPMENT.CATEGORY_ID 
  JOIN INVENTORYJS.PROJECT ON PROJECT.PROJECT_ID = INVENTORY.PROJECT_ID
  WHERE INVENTORY.STATUS = '1' 
  AND ` +
    filter +
    ` ilike ` +
    `'%` +
    search +
    `%'
  ORDER BY INVENTORY_ID ASC`;
  return query;
};

allProjects = () => {
  const query = `SELECT * FROM INVENTORYJS.PROJECT WHERE PROJECT_NAME != 'Unassigned' AND PROJECT.STATUS = '1'`;
  return query;
};

allHistory = () => {
  const query = `SELECT HISTORY.HISTORY_ID, EQUIPMENT.EQUIPMENT_NAME, EVENT.EVENT, HISTORY.DATE 
  FROM INVENTORYJS.HISTORY 
  JOIN INVENTORYJS.EVENT ON EVENT.EVENT_ID = HISTORY.EVENT_ID 
  JOIN INVENTORYJS.INVENTORY ON INVENTORY.INVENTORY_ID = HISTORY.INVENTORY_ID
  JOIN INVENTORYJS.EQUIPMENT ON EQUIPMENT.EQUIPMENT_ID = INVENTORY.EQUIPMENT_ID
  ORDER BY HISTORY_ID DESC`;
  return query;
};

const queryList = {
  q_inventory: fullInventory,
  q_inventorySearch: fullInventorySearch,
  q_inventoryID: getInventoryID,
  q_projects: allProjects,
  q_history: allHistory
};

// render(){

// }
// }
// module.exports = queryList;
module.exports = queryList;
