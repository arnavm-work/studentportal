import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

function StudentList({ students, performDelete, handleEditClick}) {
  const columnDefs = [
    { field: "id" },
    { field: "name",
        editable: true
        },
    { field: "email" ,
        editable: true
        },
    { field: "course" ,
        editable: true
        },
    { headerName: "Actions",
      cellRenderer: (params) => (
          <div>
            <button onClick={() => performDelete(params.data.id)}>
              Delete
            </button>
            <button onClick={() => handleEditClick(params.data)}>
              Edit
            </button>
          </div>
      )
    }
  ];

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
      />
    </div>
  );
}

export default StudentList;