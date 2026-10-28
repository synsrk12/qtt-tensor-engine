# QTT Tensor Engine

QTT Tensor Engine is a web application for exploring tensor components allowed by crystal symmetry. It combines a Next.js frontend with  a  FastAPI  backend  and  Wolfram 
Language calculations.

## Features

- Calculate allowed tensor components under a crystal operation or individual point groups (magnetic or non-magnetic).
- Explore the behavior of the tensor across 122 magnetic point groups in component --> group and group --> tensor component format.
- Select multiple point groups for a custom-group calculation and generate publication ready Latex tables for symmetry analysis.
- Currently works only with magnetic point groups but spin group analysis will be added in future.

## Technology

- Frontend: Next.js, React, TypeScript, and KaTeX
- Backend: FastAPI and Python
- Calculation engine: Wolfram Language scripts

## Requirements

- Node.js 18 or newer and npm
- Python 3.10 or newer
- Wolfram Engine or Mathematica, with the `wolfram` command available on your `PATH`
- A Wolfram license/entitlement appropriate for your installation

## Run locally

Clone the repository:

```bash
git clone https://github.com/synsrk12/qtt-tensor-engine.git
cd qtt-tensor-engine
```

### 1. Start the backend

In a terminal:

```bash
cd TnsrBackend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install fastapi uvicorn pydantic
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

On Windows, activate the virtual environment with:

```powershell
.venv\Scripts\activate
```

The backend API is available at <http://127.0.0.1:8000>. Interactive API documentation is at <http://127.0.0.1:8000/docs>.

### 2. Start the frontend

In a second terminal, from the repository root:

```bash
cd Project_bolt/project
npm ci
npm run dev
```

Open <http://localhost:3000>. Keep the backend running while using the application: the frontend's calculation route forwards requests to `http://127.0.0.1:8000`.

## How to use

1. Define the tensor

   Enter the appropriate Jahn symbol for the response tensor manually, or use the built-in generator panel to generate the symbol. The generator panel asks for properties
   of the response tensor such as axial/polar nature, magnetic/non-magnetic behavior and symmetry/anti-symmetry under the exchange of different  tensor indices. Selecting
   appropriate options from the dropdown, click on Generate. 

2. Select a calculation mode

   The application provides five calculation modes:
  
   - Individual Crystal Operation: Select a crystal symmetry operation from the dropdown menu. Choose whether to combine the selected operation with time reversal.
   - Individual Point Group: Select one of the 122 magnetic point groups and calculate the allowed tensor components.
   - All Point Groups (Group → Components): Calculate the allowed tensor components for all 122 magnetic point groups.
   - All Point Groups (Components → Group): Identify the magnetic point groups that allow the specified tensor components.
   - Custom Group Selection: Select multiple magnetic point groups for a custom symmetry analysis.

3. Inspect and export the results

   Submit the calculation to view the results.
   
   Depending on the selected calculation mode, the result panel displays:
    - Allowed tensor components and their relationships in list format.
    - Matrix representations of the tensor.
    - Mathematical notation and LaTeX previews.
    - Downloadable .tex files containing the generated tables for supported all-group and custom-group calculations. The generated LaTeX tables can be incorporated
      into research manuscripts and other scientific documents.
    
    
4. Restore previous calculations

Use the History panel to restore previous results. The application retains up to the last 10 history entries. 

## API endpoints

The FastAPI backend provides:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/point-groups` | List point groups |
| `GET` | `/operations` | List crystal operations |
| `POST` | `/calculate` | Calculate tensor results |

## Project layout

```text
Project_bolt/project/   Next.js frontend and its local API routes
TnsrBackend/            FastAPI application, calculation code, and Wolfram scripts
```

The frontend package scripts include `npm run typecheck` and `npm run build`.


## Additional documentation

- [Frontend installation guide](Project_bolt/project/INSTALLATION_GUIDE.txt)
- [Tensor engine reference](Project_bolt/project/ENGINE_REFERENCE.txt)
