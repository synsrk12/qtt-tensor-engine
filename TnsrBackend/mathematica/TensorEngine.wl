(* ::Package:: *)

(* ::Input::Initialization:: *)
(* determine script directory robustly and load local TensorCode.wl *)
$ScriptDir = If[StringQ[$InputFileName] && $InputFileName != "", DirectoryName[$InputFileName], Directory[]];
Get[FileNameJoin[{$ScriptDir, "TensorCode.wl"}]]

TensorOperationRules[operation_,magneticType_,jahnSymbol_]:=Module[{res},res=Quiet[TnsrSlnsMod[operation,magneticType,jahnSymbol]];
If[res===$Failed,Return[$Failed]];
res[[2]]];

TensorOperationMatrix[operation_,magneticType_,jahnSymbol_]:=Module[{res},res=Quiet[TnsrSlnsMod[operation,magneticType,jahnSymbol]];
If[res===$Failed,Return[$Failed]];
res[[1]]];

TensorPointGroupRules[group_,jahn_]:=Quiet[mpgoptnsrnhMod[group,jahn][[2]]];

TensorPointGroupMatrix[group_,jahn_]:=Quiet[mpgoptnsrnhMod[group,jahn][[1]]];

TensorAllGroups[jahn_]:=Quiet[MakeTableMPGRMod[jahn]];

TensorMatrixToJSON[matrix_]:=Module[{convert},convert[x_List]:=convert/@x;
convert[x_]:=ToString[x,InputForm];
<|"symbol"->"f","rows"->convert[matrix]|>];


TensorRulesToJSON[rules_,matrix_]:=Module[{jsonRules,jsonMatrix,allowed},jsonRules=rules/. Rule[l_,r_]:><|"lhs"->ToString[l,InputForm],"rhs"->ToString[r,InputForm]
|>;

jsonMatrix=TensorMatrixToJSON[matrix];

allowed=TensorAllowedComponents[matrix];

ExportString[<|"status"->"success","allowedComponents"->allowed,"matrix"->jsonMatrix,"relations"->jsonRules|>,"RawJSON"]
]

TensorAllowedComponents[tensor_]:=Module[{rules},rules=Most[ArrayRules[tensor]];
DeleteDuplicates[ToString[Apply[f,First[#]],InputForm]&/@rules]]

TensorAllPointGroupsJSON[Jahn_] :=
 Module[{table},

  table = Rest @ MakeTableMPGRMod[Jahn];

  Map[
   <|
     "pointGroup" -> ToString[#[[1]]],
     "allowedComponents" -> #[[2]]
   |>&,
   table
  ]
 ];
 
 TensorInversePointGroupsJSON[Jahn_] :=
 Module[{table},

  table = Rest @ MakeInverseTableMPGRMod[Jahn];

  Map[
   <|
     "component" -> #[[1]],
     "pointGroups" -> #[[2]]
   |>&,
   table
  ]
 ];

TensorCalculate[mode_, selection_, trs_, jahn_, view_ : "table"] :=
 Module[{rules, matrix},

  Switch[mode,

   "operation",
   (
    rules = TensorOperationRules[selection, trs, jahn];
    matrix = TensorOperationMatrix[selection, trs, jahn];
   ),

   "pointgroup",
   (
    rules = TensorPointGroupRules[selection, jahn];
    matrix = TensorPointGroupMatrix[selection, jahn];
   ),

   "allgroups",
   (
    Return[
      ExportString[
        Switch[view,

          "table",
          MakeTableMPGRJSON[jahn],

          "inverse",
          MakeInverseTableMPGRJSON[jahn],

          _,
          <|
            "status" -> "error",
            "message" -> "Unknown allgroups view."
          |>

        ],
        "RawJSON"
      ]
    ];
   ),
   "custom",
   (
    Return[
      ExportString[MakeCustomMPGRJSON[jahn, selection], "RawJSON"]
    ];
   ),

   _,
   Return[
    ExportString[
      <|
        "status" -> "error",
        "message" -> "Unknown mode."
      |>,
      "RawJSON"
    ]
   ]
  ];

  If[
    rules === $Failed || matrix === $Failed,

    Return[
      ExportString[
        <|
          "status" -> "error",
          "message" -> "Invalid Jahn symbol."
        |>,
        "RawJSON"
      ]
    ]
  ];

  TensorRulesToJSON[rules, matrix]
];
