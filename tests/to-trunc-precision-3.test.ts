import {formatNumber, toTruncPrecision3} from "../src/byte-size-converter";

import {Tester} from "@alttiri/util-node-js";
const {eq, report} = new Tester().destructible();


eq("1", toTruncPrecision3(10.1005859375), "10.1");
eq("2", toTruncPrecision3(10.0996093750), "10.0");
eq("3", toTruncPrecision3(9.99902343750), "9.99");
eq("4", toTruncPrecision3(9.98925781250), "9.98");
eq("5", toTruncPrecision3(1.23925781250), "1.23");
eq("6", toTruncPrecision3(1.10937500000), "1.10");
eq("7", toTruncPrecision3(836.966796875), "836");
eq("8", toTruncPrecision3(1836.96679687), "1836");
eq("a", toTruncPrecision3(0.08),  "0.08");
eq("b", toTruncPrecision3(0.099), "0.09");
eq("v", toTruncPrecision3(0.0099), "0");

eq("f1", formatNumber(34456909),  "34 456 909");
eq("f2", formatNumber( 4456909),   "4 456 909");
eq("f3", formatNumber(  456909),     "456 909");
eq("f4", formatNumber(       1),           "1");
eq("f5", formatNumber(      -1),          "-1");
eq("f6", formatNumber(    -123),        "-123");
eq("f7", formatNumber(   -1234),      "-1 234");
eq("f8", formatNumber( -123456),    "-123 456");


report();
