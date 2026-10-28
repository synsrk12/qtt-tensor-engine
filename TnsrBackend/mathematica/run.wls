#!/usr/bin/env wolframscript
(* ::Package:: *)

(* ::Input::Initialization:: *)
(* determine script directory robustly and load local TensorEngine.wl *)
$ScriptDir = If[StringQ[$InputFileName] && $InputFileName != "", DirectoryName[$InputFileName], Directory[]];
Get[FileNameJoin[{$ScriptDir, "TensorEngine.wl"}]];

args=Drop[$CommandLine,3];

mode=args[[1]];
selectionArg=args[[2]];

If[mode=="allgroups",
  selection="";
  jahn=args[[2]];
  view=args[[3]],
  If[mode=="operation",
    selection=ToExpression[selectionArg];
    trs=args[[3]];
    jahn=args[[4]];
    view="";
    ,
    If[mode=="custom",
      selection=StringSplit[ToString[selectionArg], ","];
      trs="";
      jahn=args[[3]];
      view="";
      ,
      (* pointgroup *)
      selection=ToExpression[selectionArg];
      trs="";
      jahn=args[[3]];
      view="";
    ]
  ];
];

Print["mode = ",mode];
Print["view = ",view];

Quiet[Print[TensorCalculate[mode,selection,trs,jahn,view]],{Solve::svars,General::stop}];

Exit[];
