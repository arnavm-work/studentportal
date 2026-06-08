import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


ModuleRegistry.registerModules([AllCommunityModule]);

function StudentList({ students, performDelete, editingId, setEditingId, handleSave }) {
  const columnDefs = [
    { field: "id" },
    { field: "name",
        editable: (params) => params.data.id === editingId
        },
    { field: "email" ,
        editable: (params) => params.data.id === editingId
        },
    { field: "course" ,
        editable: (params) => params.data.id === editingId
        },
    { headerName: "Actions",
      cellRenderer: (params) => {
        if (params.data.id === editingId) {
          return (
            <div className="action-buttons">
              <button className="save-btn"onClick={() => handleSave(params.data)}>
                Save
              </button>
              <button onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </div>
          );                      
        }
          return (
            <div className="action-buttons">
            <button onClick={() => setEditingId(params.data.id)}>
              Edit
            </button>

            <button className="delete-btn" onClick={() => performDelete(params.data.id)} >
              Delete
            </button>
          </div>
        )
      }
    },];

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 400,
        width: "100%"
      }}
    >
      <AgGridReact
        theme = "legacy"
        rowData={students}
        columnDefs={columnDefs}
        getRowClass={(params) => params.data.id === editingId ? "editing-row" : ""}
      />
    </div>
  );
}

export default StudentList;