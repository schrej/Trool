/**
 * Decision Table class. Execute a group of rules on a table. There are two categories of
 * operations: Condition operations and Action operations.
 *
 * created by Sean Maxwell Mar 3, 2019
 */

import { FactsObj, ImportsObj, Row } from './types';
import TableErrs from './TableErrs';


class DecisionTable {

    private readonly tableErrs: TableErrs;

    // Setup class variables
    private _importsObj: ImportsObj | null;
    private _factArr: Object[] | null;
    private _condOpsArr: Function[] | null;
    private _actionOpsArr: Function[] | null;


    constructor(id: number) {
        this.tableErrs = new TableErrs(id);
        this._importsObj = null;
        this._factArr = null;
        this._condOpsArr = null;
        this._actionOpsArr = null;
    }


    public initTable(arrTable: Array<Row>, factsObj: FactsObj, importsObj: ImportsObj): void {

        this._importsObj = importsObj;

        // Get action/condition column header and operation string values
        const colHeaderArr = Object.values(arrTable[0]).map(header => header.trim());
        const opsStrArr = Object.values(arrTable[1]).map(op => op.trim());

        // Check for format errors and set facts
        this._setFactArr(colHeaderArr, factsObj, opsStrArr.length);

        // Init array vars
        let conditionsDone = false;
        this._condOpsArr = [];
        this._actionOpsArr = [];

        // Iterate through column headers and operations row
        for (let i = 1; i < colHeaderArr.length; i++) {

            if (colHeaderArr[i] === 'Condition') {

                if (!conditionsDone) {
                    const opStr = opsStrArr[i];
                    const opFunc = this._getCondOp(opStr);
                    this._condOpsArr.push(opFunc);
                } else {
                    throw Error(this.tableErrs.colHeaderArgmt);
                }

                if (colHeaderArr[i + 1] === 'Action') {
                    conditionsDone = true;
                }

            } else if (colHeaderArr[i] === 'Action') {

                if (conditionsDone) {
                    this._actionOpsArr.push(new Function());
                    // pick up here, maybe add operation as well
                } else {
                    throw Error(this.tableErrs.colHeaderArgmt);
                }

            } else {
                throw Error(this.tableErrs.colHeader);
            }
        }
    }

    /**
     * Do some initial checking of the Condition/Action columns and set the Fact array.
     */
    private _setFactArr(colHeaderArr: string[], factsObj: FactsObj, numOfOps: number): void {

        const startCellArr = colHeaderArr[0].split(' ');

        if (startCellArr.length !== 2) {
            throw Error(this.tableErrs.startCell);
        } else if (startCellArr[0] !== 'Start:') {
            throw Error(this.tableErrs.startCell2);
        } else if (colHeaderArr[1] !== 'Condition') {
            throw Error(this.tableErrs.condRule);
        } else if (colHeaderArr[colHeaderArr.length - 1] !== 'Action') {
            throw Error(this.tableErrs.actionColRule);
        } else if (colHeaderArr.length !== numOfOps) {
            throw Error(this.tableErrs.colLenth);
        }

        const factName = startCellArr[1];
        const facts = factsObj[factName];

        if (facts instanceof Array) {
            this._factArr = facts;
        } else {
            this._factArr = [facts];
        }
    }


    // later, when looping through rules, we want to fetch the operation at that index
    private _getCondOp(opStr: string): Function {

        return (fact: Object, value: any) => {

            let arr = opStr.split(' ');

            this._checkCondOpFormat(arr, fact)


            // throw error if attribute from operation string is not present on fact
            //
            // return boolean
        }
    }


    private _checkCondOpFormat(arr: string[], fact: Object): void {

        let attr = arr[0];

        if (attr === '') {
            throw Error(this._id + 'Condition operation cannot be blank.'); // pick up here tomorrow
            // pick up here, create a table errors class
        }

        // make sure attr exists on fact // pick up here

        if (arr.length === 1) {

        } else if (arr.length === 3) {
            // pick up here, do logic for boolean operations
        } else {
            throw Error(this._id + 'Condition operation must call Fact method (don\'t put spaces between params) ' +
                'or perform boolean operations against a Fact\'s attribute')
        }
    }


    // loop through rule, pass value from rule to condition, in this method, determine if value
    // is from an import


    // loop through rows here, this method will use imports object, if attribute doesn
    // not exist on import throw error
    // return array of updated facts
    public updateFacts(): any {
        // loops through array of facts for that factName

        // if cell string value is not a number first check to see if it's an import, if not
        // Trool will take it as just a regular string value
    }
}

export default DecisionTable;
