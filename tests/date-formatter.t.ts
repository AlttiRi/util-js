import {Tester} from "@alttiri/util-node-js";
import {formatDate} from "../src/date-formatter.js";
const {eq, report} = new Tester().destructible();


eq("1", formatDate(1234567890123), "2009.02.13");

eq("2", formatDate(1234567890123,   "YY"),   "09");
eq("3", formatDate(1234567890123, "YYYY"), "2009");
eq("4", formatDate(1234567890123, "YYYY.MM.DD hh:mm:ss"), "2009.02.13 23:31:30");


eq("4-deprecated", formatDate(1234567890123, "YYYY.MM.DD HH:mm:SS"), "2009.02.13 23:31:30");


report();
