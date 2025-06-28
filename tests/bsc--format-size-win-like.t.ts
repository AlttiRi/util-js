import {formatFileSizeWinLike} from "../src/byte-size-converter.js";

import {Tester} from "@alttiri/util-node-js";
const {eq, report} = new Tester().destructible();



eq("1023", formatFileSizeWinLike(1023), "1023 B");
eq("1024", formatFileSizeWinLike(1024), "1.00 KB");
eq("1025", formatFileSizeWinLike(1025), "1.00 KB");
eq("1033", formatFileSizeWinLike(1033), "1.00 KB");
eq("1034", formatFileSizeWinLike(1034), "1.00 KB");
eq("1035", formatFileSizeWinLike(1035), "1.01 KB");
eq("1036", formatFileSizeWinLike(1036), "1.01 KB");
eq("1044", formatFileSizeWinLike(1044), "1.01 KB");
eq("1045", formatFileSizeWinLike(1045), "1.02 KB");
eq("1126", formatFileSizeWinLike(1126), "1.09 KB");
eq("1127", formatFileSizeWinLike(1127), "1.10 KB");
eq("1136", formatFileSizeWinLike(1136), "1.10 KB");
eq("1137", formatFileSizeWinLike(1137), "1.11 KB");
eq("1269", formatFileSizeWinLike(1269), "1.23 KB");
eq("1270", formatFileSizeWinLike(1270), "1.24 KB");
eq("10229", formatFileSizeWinLike(10229), "9.98 KB");
eq("10230", formatFileSizeWinLike(10230), "9.99 KB");
eq("10239", formatFileSizeWinLike(10239), "9.99 KB");
eq("10240", formatFileSizeWinLike(10240), "10.0 KB");
eq("10241", formatFileSizeWinLike(10241), "10.0 KB");
eq("10342", formatFileSizeWinLike(10342), "10.0 KB");
eq("10343", formatFileSizeWinLike(10343), "10.1 KB");

eq("0", formatFileSizeWinLike(0), "0 B");
eq("1", formatFileSizeWinLike(68), "68 B");
eq("2", formatFileSizeWinLike(178), "178 B");
eq("3", formatFileSizeWinLike(926), "926 B");
eq("4", formatFileSizeWinLike(1109), "1.08 KB");
eq("5", formatFileSizeWinLike(1531), "1.49 KB");
eq("6", formatFileSizeWinLike(2937), "2.86 KB");
eq("7", formatFileSizeWinLike(9536), "9.31 KB");
eq("8", formatFileSizeWinLike(10051), "9.81 KB");
eq("9", formatFileSizeWinLike(10193), "9.95 KB");
eq("10", formatFileSizeWinLike(10374), "10.1 KB");
eq("11", formatFileSizeWinLike(10868), "10.6 KB");
eq("12", formatFileSizeWinLike(12328), "12.0 KB");
eq("13", formatFileSizeWinLike(20388), "19.9 KB");
eq("14", formatFileSizeWinLike(857054), "836 KB");
eq("15", formatFileSizeWinLike(949271), "927 KB");
eq("16", formatFileSizeWinLike(1005637), "982 KB");
eq("17", formatFileSizeWinLike(1031656), "0.98 MB");
eq("18", formatFileSizeWinLike(1056626), "1.00 MB");
eq("19", formatFileSizeWinLike(1082102), "1.03 MB");
eq("10", formatFileSizeWinLike(1108494), "1.05 MB");
eq("20", formatFileSizeWinLike(1133158), "1.08 MB");
eq("21", formatFileSizeWinLike(1160948), "1.10 MB");
eq("22", formatFileSizeWinLike(1250798), "1.19 MB");
eq("23", formatFileSizeWinLike(1272425), "1.21 MB");
eq("24", formatFileSizeWinLike(1294780), "1.23 MB");
eq("25", formatFileSizeWinLike(1320010), "1.25 MB");
eq("26", formatFileSizeWinLike(1340451), "1.27 MB");
eq("27", formatFileSizeWinLike(2397632), "2.28 MB");
eq("28", formatFileSizeWinLike(106886214148), "99.5 GB");
eq("29", formatFileSizeWinLike(107968130186), "100 GB");
eq("30", formatFileSizeWinLike(109050046224), "101 GB");
eq("31", formatFileSizeWinLike(110131220721), "102 GB");
eq("32", formatFileSizeWinLike(112258741522), "104 GB");
eq("33", formatFileSizeWinLike(113312671996), "105 GB");
eq("34", formatFileSizeWinLike(113330211021), "105 GB");
eq("35", formatFileSizeWinLike(113365278451), "105 GB");
eq("36", formatFileSizeWinLike(184244378424), "171 GB");
eq("37", formatFileSizeWinLike(709134659325), "660 GB");
eq("38", formatFileSizeWinLike(1037459901192), "966 GB");
eq("39", formatFileSizeWinLike(1065225078258), "992 GB");
eq("40", formatFileSizeWinLike(1085511090598), "0.98 TB");
// eq("41", formatSizeWinLike(1088661207798), "0.98 TB"); // fail
eq("42", formatFileSizeWinLike(1101101481343), "1.00 TB");
eq("43", formatFileSizeWinLike(1120103415568), "1.01 TB");
eq("44", formatFileSizeWinLike(1141425412304), "1.03 TB");
eq("45", formatFileSizeWinLike(1140309803008), "1.03 TB");
// eq("46", formatSizeWinLike(1155241971712), "1.04 TB"); // fail // % 4096
eq("47", formatFileSizeWinLike(1156350363815), "1.05 TB");
eq("48", formatFileSizeWinLike(1171333916692), "1.06 TB");
eq("49", formatFileSizeWinLike(1180658122801), "1.07 TB");
// eq("50", formatSizeWinLike(1198893047808), "1.08 TB"); // fail // % 4096
eq("51", formatFileSizeWinLike(1199981686908), "1.09 TB");
eq("52", formatFileSizeWinLike(1214215963167), "1.10 TB");
eq("53", formatFileSizeWinLike(1338401909870), "1.21 TB");
eq("54", formatFileSizeWinLike(1431992896827), "1.30 TB");

// ----

eq("q1", formatFileSizeWinLike(1433875647124), "1.30 TB");
eq("q2", formatFileSizeWinLike(1432409759744), "1.30 TB");

eq("w1", formatFileSizeWinLike(1112360389416), "1.01 TB");
// eq("w2", formatSizeWinLike(1110842765312), "1.00 TB"); // fail // % 4096

eq("e1", formatFileSizeWinLike(1163707317687), "1.05 TB");
eq("e2", formatFileSizeWinLike(1162215026688), "1.05 TB");

eq("r1", formatFileSizeWinLike(1138118739306), "1.03 TB");
eq("r2", formatFileSizeWinLike(1136595513344), "1.03 TB");

// eq("t1", formatSizeWinLike(1122038275947), "1.01 TB");  // fail
eq("t2", formatFileSizeWinLike(1120497823744), "1.01 TB");

eq("a1", formatFileSizeWinLike(1109149741893), "1.00 TB");
eq("a2", formatFileSizeWinLike(1107607552000), "1.00 TB");

eq("s1", formatFileSizeWinLike(1098188277124), "0.99 TB");
eq("s2", formatFileSizeWinLike(1096642224128), "0.99 TB");

eq("d1", formatFileSizeWinLike(1083108957890), "0.98 TB");
eq("d2", formatFileSizeWinLike(1081554362368), "0.98 TB");

eq("f1", formatFileSizeWinLike(1080501971677), "0.98 TB");
eq("f2", formatFileSizeWinLike(1078946144256), "0.98 TB");

eq("g1", formatFileSizeWinLike(1069207931098), "995 GB");
eq("g2", formatFileSizeWinLike(1067642114048), "994 GB");


// --------------------

eq("x01", formatFileSizeWinLike( 2_840_002_953_216), "2.58 TB");
eq("x02", formatFileSizeWinLike( 3_000_457_288_288), "2.72 TB");
eq("x03", formatFileSizeWinLike(12_001_547_911_168), "10.9 TB");
eq("x04", formatFileSizeWinLike(14_000_383_324_160), "12.7 TB");
eq("x05", formatFileSizeWinLike(13_999_860_125_696), "12.7 TB");
eq("x06", formatFileSizeWinLike(10_994_980_986_880), "9.99 TB");
eq("x07", formatFileSizeWinLike(10_000_695_029_760), "9.09 TB");
eq("x08", formatFileSizeWinLike(10_000_201_355_264), "9.09 TB");
eq("x09", formatFileSizeWinLike(12_000_002_306_048), "10.9 TB");
eq("x10", formatFileSizeWinLike(11_953_396_191_232), "10.8 TB");
eq("x11", formatFileSizeWinLike(16_000_881_782_784), "14.5 TB");
eq("x12", formatFileSizeWinLike(53_728_394_959_861), "48.8 TB");



eq("xxx-1", formatFileSizeWinLike(2875392), "2.74 MB");
eq("xxx-3", formatFileSizeWinLike(3178496), "3.03 MB");



//
// Note: "inaccurate" versions pass the test with the new `formatSizeWinLike` function.
// The old function is named as `formatSizeAlmostWinLike` now.
//

// ---------------------------
// 1088661207798      / 1024 =
// 1063145710.7402344 / 1024 =
// 1038228.2331447601 / 1024 =
// 1013.8947589304298 / 1024 =
// 0.9901316005179979
// 0.99 TB
eq("inaccurate-41", formatFileSizeWinLike(1088661207798), "0.98 TB");
// 1155241971712
// 1128165988
// 1101724.59765625
// 1075.9029273986816
// 1.050686452537775
// 1.05 TB
eq("inaccurate-4096-46", formatFileSizeWinLike(1155241971712), "1.04 TB");
// 1198893047808
// 1170793992
// 1143353.5078125
// 1116.5561599731445
// 1.090386874973774
// 1.09 TB
eq("inaccurate-4096-50", formatFileSizeWinLike(1198893047808), "1.08 TB");
// 1110842765312
// 1084807388
// 1059382.21484375
// 1034.5529441833496
// 1.0103056095540524
// 1.01 TB
eq("inaccurate-4096-w2", formatFileSizeWinLike(1110842765312), "1.00 TB");
// 1122038275947      / 1024 =
// 1095740503.8544922 / 1024 =
// 1070059.0857954025 / 1024 =
// 1044.9795759720728 / 1024 =
// 1.0204878671602273
// 1.02 TB
eq("inaccurate-t1", formatFileSizeWinLike(1122038275947), "1.01 TB");


// -----------------

// 2875392      / 1024 =
// 2805.984375  / 1024 =
// 2.7402191162109375
eq("inaccurate-xxx-2", formatFileSizeWinLike(2873328), "2.73 MB");
// 3177467
// 3102.9951171875
// 3.030268669128418
eq("inaccurate-xxx-4", formatFileSizeWinLike(3177467), "3.02 MB");


report();
