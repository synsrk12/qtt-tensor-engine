import subprocess
import json

MATHEMATICA_SCRIPT = "mathematica/run.wls"


def calculate_tensor(mode, selection, trs="", jahn="", view=""):
    if isinstance(selection, list):
        selection_arg = ",".join(selection)
    else:
        selection_arg = selection

    command = [
        "wolfram",
        "-script",
        MATHEMATICA_SCRIPT,
        mode,
        selection_arg,
    ]

    if mode == "operation":
        if trs == "1":
            mathematica_trs = "magnetic"
        else:
            mathematica_trs = "non-magnetic"

        command.append(mathematica_trs)
        command.append(jahn)

    elif mode == "pointgroup":
        command.append(jahn)

    elif mode == "custom":
        command.append(jahn)

    elif mode == "allgroups":
      command = [
        "wolfram",
        "-script",
        MATHEMATICA_SCRIPT,
        mode,
        jahn,
        view,
    ]
    
    else:
        raise ValueError(f"Unknown mode: {mode}")
    
    #print(command)
    process = subprocess.run(
        command,
        
        #print("COMMAND:"),
        #print(command),
        
        capture_output=True,
        text=True,
        
    )

    if process.returncode != 0:
        raise RuntimeError(process.stderr)

    try:
       stdout = process.stdout
    
       # Find where the JSON starts
       start_obj = stdout.find("{")
       start_arr = stdout.find("[")
    
       if start_obj == -1:
          start = start_arr
       elif start_arr == -1:
          start = start_obj
       else:
          start = min(start_obj, start_arr)
    
       if start == -1:
          raise RuntimeError(
              f"Mathematica did not return JSON.\n\n{stdout}"
          )
    
       data = json.loads(stdout[start:])
    
    except json.JSONDecodeError:
      raise RuntimeError(
          f"Mathematica did not return valid JSON.\n\n"
          f"STDOUT:\n{process.stdout}\n\n"
          f"STDERR:\n{process.stderr}"
      )

    #if data["status"] != "success":
     #   raise RuntimeError(
      #      data.get("message", "Unknown Mathematica error.")
       # )
    
    if mode != "allgroups":
      if data["status"] != "success":
        raise RuntimeError(
            data.get("message", "Unknown Mathematica error.")
        )
    
    #if isinstance(data, dict):
     # if data.get("status") != "success":
       # raise RuntimeError(
       #     data.get("message", "Unknown Mathematica error.")
        #)
    
    return data
