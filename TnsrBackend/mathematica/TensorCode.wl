(* ::Package:: *)

(* ::Input::Initialization:: *)
trnsfrmtrx1={{1,0,0},{0,1,0},{0,0,1}};
trnsfrmtrx1b={{-1,0,0},{0,-1,0},{0,0,-1}}; (* Gamma1 *)
trnsfrmtrxc2x={{1,0,0},{0,-1,0},{0,0,-1}};
trnsfrmtrxc2y={{-1,0,0},{0,1,0},{0,0,-1}};(* Gamma2 *)
trnsfrmtrxc2z={{-1,0,0},{0,-1,0},{0,0,1}};(* Gamma3 *)
trnsfrmtrxc3x={{1,0,0},{0,-1/2,-Sqrt[3]/2},{0,Sqrt[3]/2,-1/2}};
trnsfrmtrxc3z={{-1/2,Sqrt[3]/2,0},{-Sqrt[3]/2,-1/2,0},{0,0,1}};(* Gamma6 *)
trnsfrmtrxc4x={{1,0,0},{0,0,-1},{0,1,0}};
trnsfrmtrxc4y={{0,0,-1},{0,1,0},{1,0,0}};
trnsfrmtrxc4z={{0,1,0},{-1,0,0},{0,0,1}};(* Gamma7 *)
trnsfrmtrxc4zb={{0,-1,0},{1,0,0},{0,0,-1}};(* Gamma8 *)
trnsfrmtrxc6x={{1,0,0},{0,1/2,-Sqrt[3]/2},{0,Sqrt[3]/2,1/2}};
trnsfrmtrxc6y={{1/2,0,Sqrt[3]/2},{0,1,0},{-Sqrt[3]/2,0,1/2}};trnsfrmtrxc6z={{1/2,Sqrt[3]/2,0},{-Sqrt[3]/2,1/2,0},{0,0,1}};trnsfrmtrxs4x={{-1,0,0},{0,0,-1},{0,1,0}};(* trnsfrmtrxs4x=Cnx[4].sgmx *);trnsfrmtrxs4z={{0,1,0},{-1,0,0},{0,0,-1}};(* trnsfrmtrxs4z=Cnz[4].sgmz *);trnsfrmtrxs6x={{-1,0,0},{0,1/2,-(Sqrt[3]/2)},{0,Sqrt[3]/2,1/2}};(* trnsfrmtrxs6x=Cnx[6].sgmx *);
trnsfrmtrxs6z={{1/2,Sqrt[3]/2,0},{-(Sqrt[3]/2),1/2,0},{0,0,-1}};(* trnsfrmtrxs6z=Cnz[6].sgmz *);trnsfrmtrxsgmx={{-1,0,0},{0,1,0},{0,0,1}};trnsfrmtrxsgmz={{1,0,0},{0,1,0},{0,0,-1}};(* Gamma5 *)
trnsfrmtrxsgmy={{1,0,0},{0,-1,0},{0,0,1}};(* Gamma4 *)
trnsfrmtrx3p111={{0,1,0},{0,0,1},{1,0,0}};(* Gamma9 *)
trnsfrmtrx3plus111={{0,0,1},{1,0,0},{0,1,0}};
extra1={{0,1,0},{1,0,0},{0,0,1}};(*mx-y*)
extra2={{0,-1,0},{-1,0,0},{0,0,1}};
extra3={{0,-1,0},{-1,0,0},{0,0,-1}};


(* ::Input::Initialization:: *)



(* ::Input::Initialization:: *)
ops={trnsfrmtrx1,trnsfrmtrx1b,trnsfrmtrxc2x,trnsfrmtrxc2y,trnsfrmtrxc2z,trnsfrmtrxc3x,trnsfrmtrxc3z,trnsfrmtrxc4x,trnsfrmtrxc4y,trnsfrmtrxc4z,trnsfrmtrxc6x,trnsfrmtrxc6y,trnsfrmtrxc6z,trnsfrmtrxsgmx,trnsfrmtrxsgmy,trnsfrmtrxsgmz,trnsfrmtrx3p111,extra1,-trnsfrmtrxc4z,-trnsfrmtrxc3z,-trnsfrmtrxc6z,trnsfrmtrx3plus111};

opsName={"I","P", "C_2x","C_2y", "C_2z","C_3x","C_3z","C_4x","C_4y","C_4z","C_6x","C_6y","C_6z","m_x","m_y","m_z","3p111","m_xy","-C_4z","-C_3z","-C_6z","3_m"};



(* ::Input::Initialization:: *)
(* Magnetic Point Groups *)


(* ::Input::Initialization:: *)
mpg1={{trnsfrmtrx1,"non-magnetic","1"}};
mpg1t={{trnsfrmtrx1,"magnetic","1.1'"}};
mpg1b={{trnsfrmtrx1b,"non-magnetic","-1"}};
mpg1bt={{trnsfrmtrx1b,"non-magnetic","-1.1'"},{trnsfrmtrx1,"magnetic","-1.1'"}};
mpg1bp={{trnsfrmtrx1b,"magnetic","-1'"}};
(*mpg2={{trnsfrmtrxc2z,"non-magnetic","2"}};*)(*Gang Su*)
mpg2={{trnsfrmtrxc2y,"non-magnetic","2"}};(*Bilbao*)
(*mpg2t={{trnsfrmtrxc2z,"non-magnetic","2.1'"},{trnsfrmtrx1,"magnetic","2.1'"}};*)(*Gang Su*)
mpg2t={{trnsfrmtrxc2y,"non-magnetic","2.1'"},{trnsfrmtrx1,"magnetic","2.1'"}};(*Bilbao*)
(*mpg2p={{trnsfrmtrxc2z,"magnetic","2p"}};*)(*Gang Su*)
mpg2p={{trnsfrmtrxc2y,"magnetic","2'"}};(*Bilbao*)
(*mpgm={{trnsfrmtrxsgmz,"non-magnetic","m"}};*)(*Gang Su*)
mpgm={{trnsfrmtrxsgmy,"non-magnetic","m"}};(*Bilbao*)
(*mpgmt={{trnsfrmtrxsgmz,"non-magnetic","m.1'"},{trnsfrmtrx1,"magnetic","m.1'"}};*)(*Gang Su*)
mpgmt={{trnsfrmtrxsgmy,"non-magnetic","m.1'"},{trnsfrmtrx1,"magnetic","m.1'"}};(*Bilbao*)
(*mpgmp={{trnsfrmtrxsgmz,"magnetic","mp"}};*)(*Gang Su*)
mpgmp={{trnsfrmtrxsgmy,"magnetic","m'"}};(*Bilbao*)
(*mpg2bym={{trnsfrmtrx1b,"non-magnetic","2bym"},{trnsfrmtrxc2z,"non-magnetic","2bym"}};*)(*Gang Su*)
mpg2bym={{trnsfrmtrxsgmy,"non-magnetic","2/m"},{trnsfrmtrxc2y,"non-magnetic","2/m"}};(*Bilbao*)
(*mpg2bymt={{trnsfrmtrx1b,"non-magnetic","2bym.1'"},{trnsfrmtrxc2z,"non-magnetic","2bym.1'"},{trnsfrmtrx1,"magnetic","2/m.1'"}};*)(*Gang Su*)
mpg2bymt={{trnsfrmtrxsgmy,"non-magnetic","2/m.1'"},{trnsfrmtrxc2y,"non-magnetic","2/m.1'"},{trnsfrmtrx1,"magnetic","2/m.1'"}};(*Bilbao*)
(*mpg2bymp={{trnsfrmtrx1b,"magnetic","2bymp"},{trnsfrmtrxc2z,"non-magnetic","2bymp"}};*)(*Gang Su*)
mpg2bymp={{trnsfrmtrxsgmy,"magnetic","2/m'"},{trnsfrmtrxc2y,"non-magnetic","2/m'"}};(*Bilbao*)
(*mpg2pbym={{trnsfrmtrx1b,"magnetic","2pbym"},{trnsfrmtrxsgmz,"non-magnetic","2pbym"}};*)(*Gang Su*) 
mpg2pbym={{trnsfrmtrxsgmy,"non-magnetic","2'/m"},{trnsfrmtrxc2y,"magnetic","2'/m"}}; (*Tinder*)
mpg2pbymp={{trnsfrmtrxsgmy,"magnetic","2'/m'"},{trnsfrmtrxc2y,"magnetic","2'/m'"}};mpg222={{trnsfrmtrxc2y,"non-magnetic","222"},{trnsfrmtrxc2z,"non-magnetic","222"}};
mpg222t={{trnsfrmtrxc2y,"non-magnetic","222.1'"},{trnsfrmtrxc2z,"non-magnetic","222.1'"},{trnsfrmtrx1,"magnetic","222.1'"}};mpg22p2p={{trnsfrmtrxc2y,"magnetic","2'2'2"},{trnsfrmtrxc2z,"non-magnetic","2'2'2"}};mpg2mm={{trnsfrmtrxc2z,"non-magnetic","mm2"},{trnsfrmtrxsgmy,"non-magnetic","mm2"}};
mpg2mmt={{trnsfrmtrxc2z,"non-magnetic","mm2.1'"},{trnsfrmtrxsgmy,"non-magnetic","mm2.1'"},{trnsfrmtrx1,"magnetic","mm2.1'"}};mpg2mpmp={{trnsfrmtrxc2z,"non-magnetic","m'm'2"},{trnsfrmtrxsgmy,"magnetic","m'm'2"}};mpg2pmmp={{trnsfrmtrxc2z,"magnetic","m'm2'"},{trnsfrmtrxsgmy,"non-magnetic","m'm2'"}};mpgmmm={{trnsfrmtrxsgmx,"non-magnetic","mmm"},{trnsfrmtrxsgmy,"non-magnetic","mmm"},{trnsfrmtrxsgmz,"non-magnetic","mmm"}};
mpgmmmt={{trnsfrmtrxsgmx,"non-magnetic","mmm.1'"},{trnsfrmtrxsgmy,"non-magnetic","mmm.1'"},{trnsfrmtrxsgmz,"non-magnetic","mmm.1'"},{trnsfrmtrx1,"magnetic","mmm.1'"}};mpgmmpmp={{trnsfrmtrxsgmx,"magnetic","mm'm'"},{trnsfrmtrxsgmy,"magnetic","mm'm'"},{trnsfrmtrxsgmz,"non-magnetic","mm'm'"}};mpgmpmpmp={{trnsfrmtrxsgmx,"magnetic","m'm'm'"},{trnsfrmtrxsgmy,"magnetic","m'm'm'"},{trnsfrmtrxsgmz,"magnetic","m'm'm'"}};(*mpgmpmm={{trnsfrmtrx1b,"magnetic","mpmm"},{trnsfrmtrxc2z,"non-magnetic","mpmm"},{trnsfrmtrxsgmy,"non-magnetic","mpmm"}}*)(*Gang Su*)
mpgmpmm={{trnsfrmtrxsgmx,"magnetic","m'mm"},{trnsfrmtrxsgmy,"non-magnetic","m'mm"},{trnsfrmtrxsgmz,"non-magnetic","m'mm"}};(*Tinder*)
mpg4={{trnsfrmtrxc4z,"non-magnetic","4"}};
mpg4t={{trnsfrmtrxc4z,"non-magnetic","4.1'"},{trnsfrmtrx1,"magnetic","4.1'"}};
mpg4p={{trnsfrmtrxc4z,"magnetic","4'"}};
mpg4b={{trnsfrmtrxc4zb,"non-magnetic","-4"}};
mpg4bt={{trnsfrmtrxc4zb,"non-magnetic","-4.1'"},{trnsfrmtrx1,"magnetic","-4.1'"}};
mpg4bp={{trnsfrmtrxc4zb,"magnetic","-4'"}};mpg4bym={{trnsfrmtrxsgmz,"non-magnetic","4/m"},{trnsfrmtrxc4z,"non-magnetic","4/m"}};
mpg4bymt={{trnsfrmtrxsgmz,"non-magnetic","4/m.1'"},{trnsfrmtrxc4z,"non-magnetic","4/m.1'"},{trnsfrmtrx1,"magnetic","4/m.1'"}};mpg4bymp={{trnsfrmtrxsgmz,"magnetic","4/m'"},{trnsfrmtrxc4z,"non-magnetic","4/m'"}};mpg4pbym={{trnsfrmtrxsgmz,"non-magnetic","4'/m"},{trnsfrmtrxc4z,"magnetic","4'/m"}};mpg4pbymp={{trnsfrmtrxsgmz,"magnetic","4'/m'"},{trnsfrmtrxc4z,"magnetic","4'/m'"}};mpg422={{trnsfrmtrxc2x,"non-magnetic","422"},{trnsfrmtrxc4z,"non-magnetic","422"}};
mpg422t={{trnsfrmtrxc2y,"non-magnetic","422.1'"},{trnsfrmtrxc4z,"non-magnetic","422.1'"},{trnsfrmtrx1,"magnetic","422.1'"}};mpg42p2p={{trnsfrmtrxc2x,"magnetic","42'2'"},{trnsfrmtrxc4z,"non-magnetic","42'2'"}};mpg4p22={{trnsfrmtrxc2x,"non-magnetic","4'22"},{trnsfrmtrxc4z,"magnetic","4'22"}};(*Not present in Bilbao*)
mpg4p22p={{trnsfrmtrxc2x,"non-magnetic","4'22'"},{trnsfrmtrxc4z,"magnetic","4'22'"}};
mpg4mm={{trnsfrmtrxsgmx,"non-magnetic","4mm"},{trnsfrmtrxc4z,"non-magnetic","4mm"}};
mpg4mmt={{trnsfrmtrxsgmy,"non-magnetic","4mm.1'"},{trnsfrmtrxc4z,"non-magnetic","4mm.1'"},{trnsfrmtrx1,"magnetic","4mm.1'"}};
(*mpg4mpmp={{trnsfrmtrxsgmy,"magnetic","4mpmp"},{trnsfrmtrxc4z,"non-magnetic","4mpmp"}}*)(*Gang Su*) 
mpg4mpmp={{trnsfrmtrxsgmx,"magnetic","4m'm'"},{trnsfrmtrxc4z,"non-magnetic","4m'm'"}};(*Tinder*)(*mpg4pmmp={{trnsfrmtrxc2z,"non-magnetic","4pmmp"},{trnsfrmtrxsgmy,"non-magnetic","4pmmp"},{trnsfrmtrxc4z,"magnetic","4pmmp"}};*) (*Gang Su*)
mpg4pmpm={{trnsfrmtrxsgmx,"magnetic","4'm'm"},{trnsfrmtrxc4z,"magnetic","4'm'm"}};(*Bilbao*)
mpg4b2m={{trnsfrmtrxc2x,"non-magnetic","-42m"},{trnsfrmtrxc4zb,"non-magnetic","-42m"}};
mpg4b2mt={{trnsfrmtrxc2x,"non-magnetic","-42m.1'"},{trnsfrmtrxc4zb,"non-magnetic","-42m.1'"},{trnsfrmtrx1,"magnetic","-42m.1'"}};
(*mpg4b2pmp={{trnsfrmtrxsgmy,"magnetic","4b2pmp"},{trnsfrmtrxc4zb,"non-magnetic","4b2pmp"}}*)(*Gang Su*)
mpg4b2pmp={{trnsfrmtrxc2x,"magnetic","-42'm'"},{trnsfrmtrxc4zb,"non-magnetic","-42'm'"}}; (*Tinder*)
(*mpg4bp2mp={{trnsfrmtrxc2y,"non-magnetic","4bp2mp"},{trnsfrmtrxc2z,"non-magnetic","4bp2mp"},{trnsfrmtrxsgmy,"magnetic","4bp2mp"}}*)(*Gang Su*)
mpg4bp2mp={{trnsfrmtrxc2x,"non-magnetic","-4'2m'"},{trnsfrmtrxc4zb,"magnetic","-4'2m'"}};(*Tinder*)
(*mpg4bp2pm={{trnsfrmtrxsgmy,"non-magnetic","4bp2pm"},{trnsfrmtrxc4zb,"magnetic","4bp2pm"}}*)(*Gang Su*)
mpg4bp2pm={{trnsfrmtrxc2x,"magnetic","-4'2'm"},{trnsfrmtrxc4zb,"magnetic","-4'2'm"}};
mpg4bymmm={{trnsfrmtrxsgmx,"non-magnetic","4/mmm"},{trnsfrmtrxsgmz,"non-magnetic","4/mmm"},{trnsfrmtrxc4z,"non-magnetic","4/mmm"}};
mpg4bymmmt={{trnsfrmtrxsgmx,"non-magnetic","4/mmm.1'"},{trnsfrmtrxsgmz,"non-magnetic","4/mmm.1'"},{trnsfrmtrxc4z,"non-magnetic","4/mmm.1'"},{trnsfrmtrx1,"magnetic","4/mmm.1'"}};
mpg4bympmpmp={{trnsfrmtrxsgmx,"magnetic","4/m'm'm'"},{trnsfrmtrxsgmz,"magnetic","4/m'm'm'"},{trnsfrmtrxc4z,"non-magnetic","4/m'm'm'"}};mpg4bympmm={{trnsfrmtrxsgmx,"non-magnetic","4/m'mm"},{trnsfrmtrxsgmz,"magnetic","4/m'mm"},{trnsfrmtrxc4z,"non-magnetic","4/m'mm"}};mpg4pbymmmp={{trnsfrmtrxsgmx,"non-magnetic","4'/mmm'"},{trnsfrmtrxsgmz,"non-magnetic","4'/mmm'"},{trnsfrmtrxc4z,"magnetic","4'/mmm'"}};mpg4pbympmpm={{trnsfrmtrxsgmx,"magnetic","4'/m'm'm"},{trnsfrmtrxsgmz,"magnetic","4'/m'm'm"},{trnsfrmtrxc4z,"magnetic","4'/m'm'm"}};mpg4bymmpmp={{trnsfrmtrxsgmx,"magnetic","4/mm'm'"},{trnsfrmtrxsgmz,"non-magnetic","4/mm'm'"},{trnsfrmtrxc4z,"non-magnetic","4/mm'm'"}};mpg3={{trnsfrmtrxc3z,"non-magnetic","3"}};
mpg3t={{trnsfrmtrxc3z,"non-magnetic","3.1'"},{trnsfrmtrx1,"magnetic","3.1'"}};
mpg3b={{trnsfrmtrx1b,"non-magnetic","-3"},{trnsfrmtrxc3z,"non-magnetic","-3"}};
mpg3bt={{trnsfrmtrx1b,"non-magnetic","-3.1'"},{trnsfrmtrxc3z,"non-magnetic","-3.1'"},{trnsfrmtrx1,"magnetic","-3.1'"}};mpg3bp={{trnsfrmtrx1b,"magnetic","-3'"},{trnsfrmtrxc3z,"non-magnetic","-3'"}};mpg32={{trnsfrmtrxc2x,"non-magnetic","32"},{trnsfrmtrxc3z,"non-magnetic","32"}};
mpg32t={{trnsfrmtrxc2x,"non-magnetic","32.1'"},{trnsfrmtrxc3z,"non-magnetic","32.1'"},{trnsfrmtrx1,"magnetic","32.1'"}};
mpg32p={{trnsfrmtrxc2x,"magnetic","32'"},{trnsfrmtrxc3z,"non-magnetic","32'"}};mpg3m={{trnsfrmtrxsgmx,"non-magnetic","3m"},{trnsfrmtrxc3z,"non-magnetic","3m"}};
mpg3mt={{trnsfrmtrxsgmx,"non-magnetic","3m.1'"},{trnsfrmtrxc3z,"non-magnetic","3m.1'"},{trnsfrmtrx1,"magnetic","3m.1'"}};mpg3mp={{trnsfrmtrxsgmx,"magnetic","3m'"},{trnsfrmtrxc3z,"non-magnetic","3m'"}};mpg3bm={{trnsfrmtrx1b,"non-magnetic","-3m"},{trnsfrmtrxsgmx,"non-magnetic","-3m"},{trnsfrmtrxc3z,"non-magnetic","-3m"}};
mpg3bmt={{trnsfrmtrx1b,"non-magnetic","-3m.1'"},{trnsfrmtrxsgmx,"non-magnetic","-3m.1'"},{trnsfrmtrxc3z,"non-magnetic","-3m.1'"},{trnsfrmtrx1,"magnetic","-3m.1'"}};
mpg3bpmp={{trnsfrmtrxsgmx,"magnetic","-3'm'"},{-trnsfrmtrxc3z,"magnetic","-3'm'"}};mpg3bpm={{trnsfrmtrxsgmx,"non-magnetic","-3'm"},{-trnsfrmtrxc3z,"magnetic","-3'm"}};mpg3bmp={{trnsfrmtrx1b,"non-magnetic","-3m'"},{trnsfrmtrxsgmx,"magnetic","-3m'"},{trnsfrmtrxc3z,"non-magnetic","-3m'"}};mpg6={{trnsfrmtrxc6z,"non-magnetic","6"}};
mpg6t={{trnsfrmtrxc6z,"non-magnetic","6.1'"},{trnsfrmtrx1,"magnetic","6.1'"}};
mpg6p={{trnsfrmtrxc6z,"magnetic","6'"}};
mpg6b={{trnsfrmtrx1b,"non-magnetic","-6"},{trnsfrmtrxc6z,"non-magnetic","-6"}};
mpg6bt={{trnsfrmtrx1b,"non-magnetic","-6.1'"},{trnsfrmtrxc6z,"non-magnetic","-6.1'"},{trnsfrmtrx1,"magnetic","-6.1'"}};
mpg6bp={{-trnsfrmtrxc6z,"magnetic","-6'"}};mpg6bym={{trnsfrmtrxsgmz,"non-magnetic","6/m"},{trnsfrmtrxc6z,"non-magnetic","6/m"}};
mpg6bymt={{trnsfrmtrxsgmz,"non-magnetic","6/m.1'"},{trnsfrmtrxc6z,"non-magnetic","6/m.1'"},{trnsfrmtrx1,"magnetic","6/m.1'"}};
mpg6bymp={{trnsfrmtrxsgmz,"magnetic","6/m'"},{trnsfrmtrxc6z,"non-magnetic","6/m'"}};mpg6pbym={{trnsfrmtrxsgmz,"non-magnetic","6'/m"},{trnsfrmtrxc6z,"magnetic","6'/m"}};mpg6pbymp={{trnsfrmtrxsgmz,"magnetic","6'/m'"},{trnsfrmtrxc6z,"magnetic","6'/m'"}};mpg622={{trnsfrmtrxc2x,"non-magnetic","622"},{trnsfrmtrxc6z,"non-magnetic","622"}};
mpg622t={{trnsfrmtrxc2x,"non-magnetic","622.1'"},{trnsfrmtrxc6z,"non-magnetic","622.1'"},{trnsfrmtrx1,"magnetic","622.1'"}};
mpg62p2p={{trnsfrmtrxc2y,"magnetic","62'2'"},{trnsfrmtrxc2z,"non-magnetic","62'2'"},{trnsfrmtrxc3z,"non-magnetic","62'2'"}};mpg6p22p={{trnsfrmtrxc2x,"non-magnetic","6'22'"},{trnsfrmtrxc6z,"magnetic","6'22'"}};mpg6mm={{trnsfrmtrxsgmx,"non-magnetic","6mm"},{trnsfrmtrxc6z,"non-magnetic","6mm"}};
mpg6mmt={{trnsfrmtrxsgmx,"non-magnetic","6mm.1'"},{trnsfrmtrxc6z,"non-magnetic","6mm.1'"},{trnsfrmtrx1,"magnetic","6mm.1'"}};
mpg6mpmp={{trnsfrmtrxsgmx,"magnetic","6m'm'"},{trnsfrmtrxc6z,"non-magnetic","6m'm'"}};mpg6pmmp={{trnsfrmtrxsgmx,"non-magnetic","6'mm'"},{trnsfrmtrxc6z,"magnetic","6'mm'"}};mpg6bm2={{trnsfrmtrxsgmx,"non-magnetic","-6m2"},{trnsfrmtrx1b,"non-magnetic","-6m2"},{trnsfrmtrxc6z,"non-magnetic","-6m2"}};
mpg6bm2t={{trnsfrmtrxsgmx,"non-magnetic","-6m2.1'"},{trnsfrmtrx1b,"non-magnetic","-6m2.1'"},{trnsfrmtrxc6z,"non-magnetic","-6m2.1'"},{trnsfrmtrx1,"magnetic","-6m2.1'"}};mpg6bmp2p={{trnsfrmtrxsgmx,"magnetic","-6m'2'"},{-trnsfrmtrxc6z,"non-magnetic","-6m'2'"}};mpg6bpm2p={{trnsfrmtrxsgmx,"non-magnetic","-6'm2'"},{-trnsfrmtrxc6z,"magnetic","-6'm2'"}};mpg6bpmp2={{trnsfrmtrxsgmx,"magnetic","-6'm'2"},{-trnsfrmtrxc6z,"magnetic","-6'm'2"}};mpg6bymmm={{trnsfrmtrxsgmx,"non-magnetic","6/mmm"},{trnsfrmtrxsgmz,"non-magnetic","6/mmm"},{trnsfrmtrxc6z,"non-magnetic","6/mmm"}};
mpg6bymmmt={{trnsfrmtrxsgmx,"non-magnetic","6/mmm.1'"},{trnsfrmtrxsgmz,"non-magnetic","6/mmm.1'"},{trnsfrmtrxc6z,"non-magnetic","6/mmm.1'"},{trnsfrmtrx1,"magnetic","6/mmm.1'"}};mpg6pbymmmp={{trnsfrmtrxsgmx,"magnetic","6'/mmm'"},{trnsfrmtrxsgmz,"non-magnetic","6'/mmm'"},{trnsfrmtrxc6z,"magnetic","6'/mmm'"},{trnsfrmtrx1b,"magnetic","6'/mmm'"}};mpg6pbympmmp={{trnsfrmtrxsgmx,"non-magnetic","6'/m'mm'"},{trnsfrmtrxsgmz,"magnetic","6'/m'mm'"},{trnsfrmtrxc6z,"magnetic","6'/m'mm'"},{trnsfrmtrx1b,"non-magnetic","6'/m'mm'"}};mpg6bympmpmp={{trnsfrmtrxsgmx,"magnetic","6/m'm'm'"},{trnsfrmtrxsgmz,"magnetic","6/m'm'm'"},{trnsfrmtrxc6z,"non-magnetic","6/m'm'm'"}};mpg6bympmm={{trnsfrmtrxsgmx,"non-magnetic","6/m'mm"},{trnsfrmtrxsgmz,"magnetic","6/m'mm"},{trnsfrmtrxc6z,"non-magnetic","6/m'mm"},{trnsfrmtrx1b,"magnetic","6/m'mm"}};mpg6bymmpmp={{trnsfrmtrxsgmx,"magnetic","6/mm'm'"},{trnsfrmtrxsgmz,"magnetic","6/mm'm'"},{trnsfrmtrxc6z,"magnetic","6/mm'm'"}};mpg23={{trnsfrmtrxc2x,"non-magnetic","23"},{trnsfrmtrx3p111,"non-magnetic","23"}};
mpg23t={{trnsfrmtrxc2z,"non-magnetic","23.1'"},{trnsfrmtrx3p111,"non-magnetic","23.1'"},{trnsfrmtrx1,"magnetic","23.1'"}};mpgm3={{trnsfrmtrxsgmx,"non-magnetic","m3"},{trnsfrmtrx3p111,"non-magnetic","m3"}};
mpgm3t={{trnsfrmtrxsgmx,"non-magnetic","m3.1'"},{trnsfrmtrx3p111,"non-magnetic","m3.1'"},{trnsfrmtrx1,"magnetic","m3.1'"}};mpgmp3p={{trnsfrmtrx1b,"magnetic","m'3'"},{trnsfrmtrxc2z,"non-magnetic","m'3'"},{trnsfrmtrx3p111,"non-magnetic","m'3'"}};mpg432={{trnsfrmtrxc4x,"non-magnetic","432"},{trnsfrmtrx3p111,"non-magnetic","432"}};
mpg432t={{trnsfrmtrxc4z,"non-magnetic","432.1'"},{trnsfrmtrx3p111,"non-magnetic","432.1'"},{trnsfrmtrx1,"magnetic","432.1'"}};mpg4p32={{trnsfrmtrxc4x,"magnetic","4'32"},{trnsfrmtrx3p111,"non-magnetic","4'32"}};(*not in Bilbao*)
mpg4p32p={{trnsfrmtrxc2z,"non-magnetic","4'32'"},{trnsfrmtrxc4z,"magnetic","4'32'"},{trnsfrmtrx3p111,"non-magnetic","4'32'"}};(*Tinder*)
mpg4b3m={{trnsfrmtrxc2z,"non-magnetic","-43m"},{trnsfrmtrxc2y,"non-magnetic","-43m"},{trnsfrmtrx3plus111,"non-magnetic","-43m"},{extra1,"non-magnetic","-43m"}};
mpg4b3mt={{trnsfrmtrxc2z,"non-magnetic","-43m.1'"},{trnsfrmtrxc2y,"non-magnetic","-43m.1'"},{trnsfrmtrx3plus111,"non-magnetic","-43m.1'"},{extra1,"non-magnetic","-43m"},{trnsfrmtrx1,"magnetic","-43m.1'"}};mpg4bp3mp={{trnsfrmtrxc2z,"magnetic","-4'3m'"},{trnsfrmtrxc2y,"non-magnetic","-4'3m'"},{extra1,"non-magnetic","-4'3m'"},{trnsfrmtrx3plus111,"non-magnetic","-4'3m'"}};mpgm3m={{trnsfrmtrxsgmx,"non-magnetic","m3m"},{trnsfrmtrxc4x,"non-magnetic","m3m"},{trnsfrmtrx3p111,"non-magnetic","m3m"}};
mpgm3mt={{trnsfrmtrxsgmx,"non-magnetic","m3m.1'"},{trnsfrmtrxc4x,"non-magnetic","m3m.1'"},{trnsfrmtrx3p111,"non-magnetic","m3m.1'"},{trnsfrmtrx1,"magnetic","m3m.1'"}};mpgmp3mp={{trnsfrmtrxsgmx,"magnetic","m'3m'"},{trnsfrmtrx3p111,"non-magnetic","m'3m'"},{trnsfrmtrxc4x,"magnetic","m'3m'"}};(*Not in Bilbao*)
mpgmp3m={{trnsfrmtrxsgmx,"magnetic","m'3m"},{trnsfrmtrx3p111,"non-magnetic","m'3m"},{trnsfrmtrxc4x,"non-magnetic","m'3m"}};(*Not in Bilbao*)
mpgm3mp={{trnsfrmtrxsgmx,"magnetic","m3m'"},{trnsfrmtrx3p111,"non-magnetic","m3m'"},{trnsfrmtrxc4x,"magnetic","m3m'"}};
mpgmp3pmp={{trnsfrmtrxsgmx,"magnetic","m'3'm'"},{trnsfrmtrx3p111,"non-magnetic","m'3'm'"}};
mpgmp3pm={{trnsfrmtrxsgmx,"non-magnetic","m'3'm"},{trnsfrmtrx3p111,"magnetic","m'3'm"}};



(* ::Input::Initialization:: *)
mpgs={mpg1,mpg1t,mpg1b,mpg1bt,mpg1bp,mpg2,mpg2t,mpg2p,mpgm,mpgmt,mpgmp,mpg2bym,mpg2bymt,mpg2pbym,mpg2bymp,mpg2pbymp,mpg222,mpg222t,mpg22p2p,mpg2mm,mpg2mmt,mpg2mpmp,mpg2pmmp,mpgmmm,mpgmmmt,mpgmmpmp,mpgmpmpmp,mpgmpmm,mpg4,mpg4t,mpg4p,mpg4b,mpg4bt,mpg4bp,mpg4bym,mpg4bymt,mpg4bymp,mpg4pbym,mpg4pbymp,mpg422,mpg422t,mpg42p2p,mpg4p22p,mpg4mm,mpg4mmt,mpg4mpmp,mpg4pmpm,mpg4b2m,mpg4b2mt,mpg4b2pmp,mpg4bp2mp,mpg4bp2pm,mpg4bymmm,mpg4bymmmt,mpg4bympmpmp,mpg4bympmm,mpg4pbymmmp,mpg4pbympmpm,mpg4bymmpmp,mpg3,mpg3t,mpg3b,mpg3bt,mpg3bp,mpg32,mpg32t,mpg32p,mpg3m,mpg3mt,mpg3mp,mpg3bm,mpg3bmt,mpg3bpmp,mpg3bpm,mpg3bmp,mpg6,mpg6t,mpg6p,mpg6b,mpg6bt,mpg6bp,mpg6bym,mpg6bymt,mpg6bymp,mpg6pbym,mpg6pbymp,mpg622,mpg622t,mpg62p2p,mpg6p22p,mpg6mm,mpg6mmt,mpg6mpmp,mpg6pmmp,mpg6bm2,mpg6bm2t,mpg6bmp2p,mpg6bpm2p,mpg6bpmp2,mpg6bymmm,mpg6bymmmt,mpg6pbymmmp,mpg6pbympmmp,mpg6bympmpmp,mpg6bympmm,mpg6bymmpmp,mpg23,mpg23t,mpgm3,mpgm3t,mpgmp3p,mpg432,mpg432t,mpg4p32p,mpg4b3m,mpg4b3mt,mpg4bp3mp,mpgm3m,mpgm3mt,mpgmp3pm,mpgm3mp,mpgmp3pmp};

mpgNames={"mpg1","mpg1t","mpg1b","mpg1bt","mpg1bp","mpg2","mpg2t","mpg2p","mpgm","mpgmt","mpgmp","mpg2bym","mpg2bymt","mpg2pbym","mpg2bymp","mpg2pbymp","mpg222","mpg222t","mpg22p2p","mpg2mm","mpg2mmt","mpg2mpmp","mpg2pmmp","mpgmmm","mpgmmmt","mpgmmpmp","mpgmpmpmp","mpgmpmm","mpg4","mpg4t","mpg4p","mpg4b","mpg4bt","mpg4bp","mpg4bym","mpg4bymt","mpg4bymp","mpg4pbym","mpg4pbymp","mpg422","mpg422t","mpg42p2p","mpg4p22p","mpg4mm","mpg4mmt","mpg4mpmp","mpg4pmpm","mpg4b2m","mpg4b2mt","mpg4b2pmp","mpg4bp2mp","mpg4bp2pm","mpg4bymmm","mpg4bymmmt","mpg4bympmpmp","mpg4bympmm","mpg4pbymmmp","mpg4pbympmpm","mpg4bymmpmp","mpg3","mpg3t","mpg3b","mpg3bt","mpg3bp","mpg32","mpg32t","mpg32p","mpg3m","mpg3mt","mpg3mp","mpg3bm","mpg3bmt","mpg3bpmp","mpg3bpm","mpg3bmp","mpg6","mpg6t","mpg6p","mpg6b","mpg6bt","mpg6bp","mpg6bym","mpg6bymt","mpg6bymp","mpg6pbym","mpg6pbymp","mpg622","mpg622t","mpg62p2p","mpg6p22p","mpg6mm","mpg6mmt","mpg6mpmp","mpg6pmmp","mpg6bm2","mpg6bm2t","mpg6bmp2p","mpg6bpm2p","mpg6bpmp2","mpg6bymmm","mpg6bymmmt","mpg6pbymmmp","mpg6pbympmmp","mpg6bympmpmp","mpg6bympmm","mpg6bymmpmp","mpg23","mpg23t","mpgm3","mpgm3t","mpgmp3p","mpg432","mpg432t","mpg4p32p","mpg4b3m","mpg4b3mt","mpg4bp3mp","mpgm3m","mpgm3mt","mpgmp3pm","mpgm3mp","mpgmp3pmp"};


(* ::Input::Initialization:: *)
Length[mpgs]


(* ::Input::Initialization:: *)
SymmetrizeTensor[tensor_,symIndices_List]:=
Module[{dims,rank,newTensor,indexTuples,canonical},(*Get the dimensions and rank of the tensor*)dims=Dimensions[tensor];rank=Length[dims];(*Initialize new tensor with the same dimensions*)
newTensor=ConstantArray[0,dims];(*Generate all index combinations.For each dimension,indices run from 1 to the corresponding dimension.For example,if dims={3,3,3,3,3},then we generate all 5-tuples from {1,2,3}.*)
indexTuples=Tuples[Table[Range[dims[[i]]],{i,rank}]];
(*Loop over each index combination*)
Do[(*For the current index tuple idx,create a canonical version*)canonical=idx;(*Replace the entries at positions symIndices with their sorted\ order*)canonical[[symIndices]]=Sort[canonical[[symIndices]]];(*Impose symmetry by making newTensor at idx equal to tensor at\ canonical*)newTensor[[Sequence@@idx]]=tensor[[Sequence@@canonical]],{idx,indexTuples}];newTensor];

AntiSymmetrizeTensor[tensor_,antisymIndices_List]:=Module[{dims,rank,newTensor,indexTuples,sign,permutedIdx},(*Get the dimensions and rank of the tensor*)dims=Dimensions[tensor];rank=Length[dims];(*Initialize new tensor with the same dimensions*)newTensor=ConstantArray[0,dims];(*Generate all index combinations*)indexTuples=Tuples[Table[Range[dims[[i]]],{i,rank}]];(*Loop over each index combination*)Do[(*If any two indices in antisymIndices are equal,set component to zero*)If[DuplicateFreeQ[idx[[antisymIndices]]]==False,newTensor[[Sequence@@idx]]=0,(*Otherwise,antisymmetrize*)sign=Signature[idx[[antisymIndices]]];(*Determine permutation sign*)permutedIdx=idx;(*Start with the original index tuple*)(*Sort the\ antisymmetric indices in increasing order*)permutedIdx[[antisymIndices]]=Sort[idx[[antisymIndices]]];(*Apply the antisymmetry condition*)newTensor[[Sequence@@idx]]=sign*tensor[[Sequence@@permutedIdx]]],{idx,indexTuples}];newTensor];


(*** New definition for transfromation, takes care of all type of Jahn Symbols***)
TnsrSlnsMod[trnsfrmtrx_, timereversal_, JahnSymbol_] :=
 Module[{initTensor, finalTensor, adjustedTensor, baseVars,
   transformVars, chiralFactor, magFactor, solutions, sol,
   RC, tensorRank, en, Qi, Qj, StartInd, EndInd, symInd,
   modJahn, blockLen, digitsBefore, consumed,
   variablesFlattened},

  (* Determine tensor rank *)
  RC = Quiet@Check[
     ToExpression /@ StringCases[JahnSymbol, DigitCharacter..],
     Return[$Failed]
     ];

  If[RC === {} || Total[RC] == 0,
   Return[$Failed];
   ];

  tensorRank = Total[RC];

  initTensor = Array[f, ConstantArray[3, tensorRank]];
  finalTensor = ConstantArray[0, ConstantArray[3, tensorRank]];

  (* chirality and magnetic factors *)
  If[StringContainsQ[JahnSymbol, "e"],
   chiralFactor = Det[trnsfrmtrx],
   chiralFactor = 1
   ];

  If[StringContainsQ[JahnSymbol, "a"],
   If[timereversal == "magnetic",
    magFactor = -1,
    magFactor = 1
    ],
   magFactor = 1
   ];

  (* remove markers for parsing *)
  modJahn = StringDelete[JahnSymbol, {"a", "e", "V"}];

  baseVars = Array[Subscript[base, #] &, tensorRank];
  transformVars = Array[Subscript[trans, #] &, tensorRank];

  (* transformation rule application *)
  Do[
   finalTensor[[Sequence @@ baseVars]] +=
    chiralFactor*magFactor*
     Times @@
      Table[
       trnsfrmtrx[[baseVars[[i]], transformVars[[i]]]],
       {i, 1, tensorRank}
       ]*
     initTensor[[Sequence @@ transformVars]],
   Evaluate[
    Sequence @@
      Join[
       Table[{baseVars[[i]], 1, 3}, {i, 1, tensorRank}],
       Table[{transformVars[[i]], 1, 3}, {i, 1, tensorRank}]
       ]
    ]
   ];

  variablesFlattened = Flatten[initTensor];

  (* symmetrization [] *)
  Do[
   Qi = pos[[1]];
   blockLen = ToExpression[StringTake[modJahn, {Qi + 1}]];
   digitsBefore =
    StringCases[StringTake[modJahn, Qi - 1], DigitCharacter];
   consumed = Total[ToExpression /@ digitsBefore];
   StartInd = consumed + 1;
   EndInd = StartInd + blockLen - 1;
   symInd = Range[StartInd, EndInd];
   finalTensor = SymmetrizeTensor[finalTensor, symInd];
   ,
   {pos, StringPosition[modJahn, "["]}
   ];

  (* antisymmetrization {} *)
  Do[
   Qj = pos[[1]];
   blockLen = ToExpression[StringTake[modJahn, {Qj + 1}]];
   digitsBefore =
    StringCases[StringTake[modJahn, Qj - 1], DigitCharacter];
   consumed = Total[ToExpression /@ digitsBefore];
   StartInd = consumed + 1;
   EndInd = StartInd + blockLen - 1;
   symInd = Range[StartInd, EndInd];
   finalTensor = AntiSymmetrizeTensor[finalTensor, symInd];
   ,
   {pos, StringPosition[modJahn, "{"]}
   ];

  (* solve consistency equations *)
  sol = Solve[finalTensor == initTensor, variablesFlattened];

  If[sol === {},
   Return[$Failed];
   ];

  solutions = First[sol];

  adjustedTensor = initTensor /. solutions;

  {adjustedTensor, solutions, finalTensor, initTensor}
  ];




(* ::Input::Initialization:: *)
mpgoptnsrnhMod[mpg_,JahnSymbol_]:=Module[{slnsn,slnstotn,slnstotnf,varn,tnsrn,tnsrfn,tensorSolution,tensorrank,RC},
(*Step 1:Initialize arrays*)
slnsn=ConstantArray[{},Length[mpg]];
slnstotn={};
RC=ToExpression/@StringCases[JahnSymbol,DigitCharacter..];
tensorrank=Total[RC];
(*Step 2:Define a symbolic tensor*)
tnsrn=Array[f,ConstantArray[3,tensorrank]];
tnsrfn=Array[1,ConstantArray[3,tensorrank]];
(*Symbolic tensor*)(*Step 3:Collect solutions for all symmetry operations in mpg*)For[m=1,m<=Length[mpg],m++,slnsn[[m]]=TnsrSlnsMod[mpg[[m,1]],mpg[[m,2]],JahnSymbol][[2]]];
    (*Step 4:Combine solutions from all symmetry operations*)
For[i=1,i<=Length[mpg],i++,slnstotn=Union[slnsn[[i]],slnstotn]];
    (*Step 5:Simplify combined solutions*)
varn=Flatten[tnsrn];
     slnstotnf=Solve[slnstotn/.Rule->Equal,varn][[1]];
    (*Step 6:Substitute solutions into the symbolic tensor*)
tnsrfn=tnsrn/.slnstotnf//FullSimplify;
    (*Step 7:Reconstruct the tensor form of solutions*)
tensorSolution=tnsrfn;
    (*Step 8:Return the simplified tensor form and solutions*)
{tnsrfn,slnstotnf}
]



(* ::Input::Initialization:: *)
MakeTableMPGRMod[JahnSymbol_]:=Module[{table,res,E1,indexCombinations,n1,RC,tensorrank},(*Extract tensor rank from JahnSymbol*)RC=ToExpression/@StringCases[JahnSymbol,DigitCharacter..];
tensorrank=Total[RC];
(*Initialize table structure*)table=Table[{},{Length[mpgs]+1},{2}];
table[[1,1]]=Style["MPGs",Bold,FontSize->14,FontFamily->"Times",Blue];
table[[1,2]]=Style["Allowed Components",Bold,FontSize->14,FontFamily->"Times",Blue];
(*Iterate over MPG groups*)Table[table[[n1+1,1]]=Style[mpgs[[n1,1,3]],Bold,FontSize->14,Black];
(*Get the solution tensor*)res=mpgoptnsrnhMod[mpgs[[n1]],JahnSymbol][[1]];
(*Generate all possible index combinations for given rank*)indexCombinations=Tuples[Range[3],tensorrank];
(*Initialize E1 with the same shape as res,filled with 1s*)E1=ConstantArray[1,Dimensions[res]];
(*Check each index combination and update E1 based on res*)Do[If[res[[Sequence@@indices]]==0,E1[[Sequence@@indices]]=0],{indices,indexCombinations}];
(*Extract allowed components where E1[index]\[Equal]1*)table[[n1+1,2]]=Select[indexCombinations,E1[[Sequence@@#]]==1&],{n1,Length[mpgs]}];
(*Display as a styled Grid*)Grid[table,Frame->All,Background->{None,{{LightGray,White},Sequence@@Table[White,{Length[mpgs]}]}},ItemStyle->{{FontSize->12},{FontSize->14,Bold}},Spacings->{2,1.5}]];

MakeInverseTableMPGRMod[JahnSymbol_]:=Module[{table,res,E1,finiteComponents,allComponents,n1,RC,tensorrank,mpgIndex,indices,groupIndex,componentGroups},(*Extract tensor rank from Jahn symbol*)RC=ToExpression/@StringCases[JahnSymbol,DigitCharacter..];
tensorrank=Total[RC];
(*Generate all possible index combinations for given rank*)allComponents=Tuples[Range[3],tensorrank];
componentGroups=ConstantArray[{},Length[allComponents]];
(*Iterate over all MPG groups once, then distribute each nonzero component across all matching entries*)Do[
  res=mpgoptnsrnhMod[mpgs[[mpgIndex]],JahnSymbol][[1]];
  E1=ConstantArray[1,Dimensions[res]];
  Do[If[res[[Sequence@@indices]]==0,E1[[Sequence@@indices]]=0],{indices,allComponents}];
  Do[
    If[E1[[Sequence@@allComponents[[n1]]]]==1,
      AppendTo[componentGroups[[n1]],ToString[mpgs[[mpgIndex,1,3]]]]
    ];
    ,{n1,Length[allComponents]}];
  ,{mpgIndex,Length[mpgs]}];
(*Initialize table structure*)table=Table[{},{Length[allComponents]+1},{2}];
table[[1,1]]=Style["Tensor Component",Bold,FontSize->14,FontFamily->"Times",Blue];
table[[1,2]]=Style["MPGs with Finite Component",Bold,FontSize->14,FontFamily->"Times",Blue];
Do[
  table[[n1+1,1]]=Style[allComponents[[n1]],Bold,FontSize->12,Black];
  table[[n1+1,2]]=Style[componentGroups[[n1]],FontSize->12,FontFamily->"Times"];
  ,{n1,Length[allComponents]}];
Grid[table,Frame->All,Background->{None,{{LightGray,White},Sequence@@Table[White,{Length[allComponents]}]}},ItemStyle->{{FontSize->12},{FontSize->14,Bold}},Spacings->{2,1.5}]];

MakeTableMPGRJSON[JahnSymbol_]:=Module[{res,E1,indexCombinations,RC,tensorrank,allowed,results={},n1},(*Tensor rank*)RC=ToExpression/@StringCases[JahnSymbol,DigitCharacter..];
tensorrank=Total[RC];
(*All possible tensor indices*)indexCombinations=Tuples[Range[3],tensorrank];
Do[(*Calculate tensor for this MPG*)res=mpgoptnsrnhMod[mpgs[[n1]],JahnSymbol][[1]];
(*Mask array*)E1=ConstantArray[1,Dimensions[res]];
Do[If[res[[Sequence@@indices]]==0,E1[[Sequence@@indices]]=0],{indices,indexCombinations}];
(*Allowed tensor components*)allowed=Select[indexCombinations,E1[[Sequence@@#]]==1&];
(*Store result*)AppendTo[results,<|"id"->mpgNames[[n1]],"displayName"->ToString[mpgs[[n1,1,3]]],"allowedComponents"->allowed|>];,{n1,Length[mpgs]}];
results];

MakeCustomMPGRJSON[JahnSymbol_, selectedGroups_]:=Module[{res,E1,indexCombinations,RC,tensorrank,allowed,results={},n1,groupId,groupIndex},(*Tensor rank*)RC=ToExpression/@StringCases[JahnSymbol,DigitCharacter..];
tensorrank=Total[RC];
(*All possible tensor indices*)indexCombinations=Tuples[Range[3],tensorrank];
Do[groupId=ToString[selectedGroups[[n1]]];
groupIndex=FirstPosition[mpgNames,groupId,Missing[]];
If[groupIndex===Missing[],Continue[]];
res=mpgoptnsrnhMod[mpgs[[groupIndex[[1]]]],JahnSymbol][[1]];
E1=ConstantArray[1,Dimensions[res]];
Do[If[res[[Sequence@@indices]]==0,E1[[Sequence@@indices]]=0],{indices,indexCombinations}];
allowed=Select[indexCombinations,E1[[Sequence@@#]]==1&];
AppendTo[results,<|"id"->groupId,"displayName"->ToString[mpgs[[groupIndex[[1]],1,3]]],"allowedComponents"->allowed|>];,{n1,Length[selectedGroups]}];
<|"status"->"success","results"->results|>];

MakeInverseTableMPGRJSON[JahnSymbol_]:=Module[{RC,tensorRank,allComponents,output,finiteGroups,res,E1,component,mpgIndex,k,componentGroups},(*Extract tensor rank*)RC=ToExpression/@StringCases[JahnSymbol,DigitCharacter..];
tensorRank=Total[RC];
(*Generate all tensor components*)allComponents=Tuples[Range[3],tensorRank];
componentGroups=ConstantArray[{},Length[allComponents]];
(*Compute every group once; then add the group name to each allowed component list*)Do[
  res=mpgoptnsrnhMod[mpgs[[mpgIndex]],JahnSymbol][[1]];
  E1=ConstantArray[1,Dimensions[res]];
  Do[If[res[[Sequence@@indices]]==0,E1[[Sequence@@indices]]=0],{indices,allComponents}];
  Do[
    If[E1[[Sequence@@allComponents[[k]]]]==1,
      AppendTo[componentGroups[[k]],ToString[mpgs[[mpgIndex,1,3]]]]
    ];
    ,{k,Length[allComponents]}];
  ,{mpgIndex,Length[mpgs]}];
output=Table[
  <|"component"->StringJoin[ToString/@allComponents[[k]]],"indices"->allComponents[[k]],"groups"->componentGroups[[k]]|>,
  {k,Length[allComponents]}
];
<|"status"->"success","tensorRank"->tensorRank,"results"->output|>];
