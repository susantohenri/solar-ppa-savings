jQuery(document).ready(() => {
    const data25yr = {
        B2: { formula: `'PG&E'` },
        E2: { formula: `'SUNRUN'` },
        H2: { formula: `'SAVINGS'` },

        B4: { formula: `'Annual kWh Usage*'` },
        E4: { formula: `'Annual System kWh'` },
        F4: { formula: `C4`, format: `0,0` },

        B5: { formula: `'Average Rate per kWh'` },
        E5: { formula: `'Sunrun kWh Rate'` },
        F5: { formula: `0.199`, format: `$0.000` },
        H5: { formula: `'Rate Savings'` },
        I5: { formula: `1-(F5/C5)`, format: `0%` },

        B6: { formula: `'PG&E Annual Rate Increase %'` },
        E6: { formula: `'Inflation Escalator'` },
        F6: { value: 0.035, format: `0.0%` },

        E7: { formula: `'Monthly Solar'` },
        F7: { formula: `if(F4<1,C4*F5/12,F4*F5/12)`, format: `$0.00` },

        B8: { formula: `'Avg kWh per month'` },
        C8: { formula: `C4/12`, format: `0` },
        E8: { formula: `'Monthly Battery'` },
        F8: { formula: `65`, format: `$0.00` },

        B9: { formula: `'Monthly Electricity Payments'` },
        C9: { formula: `C8*C5`, format: `$0.00` },
        E9: { formula: `'Monthly Payment'` },
        F9: { formula: `F7+F8`, format: `$0.00` },
        H9: { formula: `'Monthly Savings'` },
        I9: { formula: `(H44/25)/12`, format: `$0.00` },

        B10: { formula: `'Annual Electricity Payments'` },
        C10: { formula: `C9*12`, format: `$0,0.00` },
        E10: { formula: `'Annual Payment'` },
        F10: { formula: `F9*12`, format: `$0,0.00` },
        H10: { formula: `'Annual Savings'` },
        I10: { formula: `H44/25`, format: `$0,0.00` },

        B12: { formula: `'Total PG&E Spend 25yrs'` },
        C12: { formula: `C44`, format: `$0,0.00` },
        E12: { formula: `'Total Sunrun Spend 25yrs'` },
        F12: { formula: `F44`, format: `$0,0.00` },
        H12: { formula: `'Lifetime Savings'` },
        I12: { formula: `C12-F12`, format: `$0,0.00` },

        B14: { formula: `GRAPH(C19:C43, ['type=line', 'orientation=vertical'])` },
        E14: { formula: `GRAPH(F19:F43, ['type=line', 'orientation=vertical'])` },
        H14: { formula: `GRAPH(C19:F43, ['type=line', 'orientation=vertical'])` },

        B16: { formula: `'PG&E'` },
        E16: { formula: `'SUNRUN'` },
        H16: { formula: `'SAVINGS'` },

        B17: { formula: `'Rate per kWh'` },
        C17: { formula: `C5`, format: `$0,0.000` },
        E17: { formula: `'Rate per kWh'` },
        F17: { formula: `F5`, format: `$0,0.000` },

        B18: { formula: `'Annual Rate Increase'` },
        C18: { formula: `C6`, format: `0.0%` },
        E18: { formula: `'Inflation Escalator'` },
        F18: { formula: `F6`, format: `0.0%` },

        B19: { formula: `'What You Pay Per Year'` },
        C19: { formula: `C10`, format: `$0,0.00` },
        E19: { formula: `'What You Pay Per Year'` },
        F19: { formula: `F9*12`, format: `$0,0.00` },
        H19: { formula: `C19-F19`, format: `$0,0.00` },

        B44: { formula: `'25 Years Cost'` },
        C44: { formula: `SUM(C19:C43)`, format: `$0,0.00` },
        E44: { formula: `'25 Years Cost'` },
        F44: { formula: `SUM(F19:F43)`, format: `$0,0.00` },
        H44: { formula: `SUM(H19:H43)`, format: `$0,0.00` },
    }

    for (let breakdown = 20; breakdown <= 43; breakdown++) {
        const rMin1 = breakdown - 1;
        data25yr[`B${breakdown}`] = { value: breakdown - 18 }
        data25yr[`C${breakdown}`] = { formula: `C${rMin1}*(1+C18)`, format: `$0,0.00` }
        data25yr[`E${breakdown}`] = { value: breakdown - 18 }
        data25yr[`F${breakdown}`] = { formula: `F${rMin1}*(1+F18)`, format: `$0,0.00` }
        data25yr[`H${breakdown}`] = { formula: `C${breakdown}-F${breakdown}`, format: `$0,0.00` }
    }

    jQuery(`#yr25`).calx({
        data: data25yr
    });

    for (let blue = 4; blue <= 10; blue++) {
        jQuery(`#yr25 [data-cell="E${blue}"]`).addClass(`sps-bgblue`).addClass(`sps-textwhite`)
        jQuery(`#yr25 [data-cell="F${blue}"]`).addClass(`sps-bgblue`).addClass(`sps-textwhite`)
    }

    for (let r1618 = 16; r1618 <= 18; r1618++) {
        jQuery(`#yr25 [data-cell="B${r1618}"]`).addClass(`sps-bgred`)
        jQuery(`#yr25 [data-cell="C${r1618}"]`).addClass(`sps-bgred`)
        jQuery(`#yr25 [data-cell="E${r1618}"]`).addClass(`sps-bglightblue`)
        jQuery(`#yr25 [data-cell="F${r1618}"]`).addClass(`sps-bglightblue`)
    }

    // monthly
    const datamonthly = {
        B2: { formula: `'PG&E'` },
        E2: { formula: `'SUNRUN'` },
        H2: { formula: `'SAVINGS'` },

        B4: { formula: `'Annual kWh Usage*'` },
        C4: { formula: `#yr25!C4`, format: `0,0` },
        E4: { formula: `'Annual System kWh'` },
        F4: { formula: `C4`, format: `0,0` },

        B5: { formula: `'Average Rate per kWh'` },
        C5: { formula: `#yr25!C5`, format: `$0,0.000` },
        E5: { formula: `'Sunrun kWh Rate'` },
        F5: { formula: `#yr25!F5`, format: `$0.000` },
        H5: { formula: `'Rate Savings'` },
        I5: { formula: `1-(F5/C5)`, format: `0%` },

        B6: { formula: `'PG&E Annual Rate Increase %'` },
        C6: { formula: `#yr25!C6`, format: `0%` },
        E6: { formula: `'Inflation Escalator'` },
        F6: { formula: `#yr25!F6`, format: `0.0%` },

        B7: { formula: `#yr25!B8` },
        C7: { formula: `#yr25!C8`, format: `0` },
        E7: { formula: `'Monthly Solar'` },
        F7: { formula: `if(F4<1,C5*F5/12,F4*F5/12)`, format: `$0.00` },

        B8: { formula: `#yr25!B10` },
        C8: { formula: `C4*C5`, format: `$0,0.00` },
        E8: { formula: `'Monthly Battery'` },
        F8: { formula: `#yr25!F8`, format: `$0.00` },

        B9: { formula: `#yr25!B9` },
        C9: { formula: `C8/12`, format: `$0.00` },
        E9: { formula: `'Monthly Payment'` },
        F9: { formula: `F8+F7`, format: `$0.00` },
        H9: { formula: `'Monthly Savings Yr 1'` },
        I9: { formula: `C9-F9`, format: `$0.00` },

        B11: { formula: `'Average PG&E Bill 10yrs'` },
        C11: { formula: `average(C20:C29)`, format: `$0.00` },
        E11: { formula: `'Average Sunrun Bill 10yrs'` },
        F11: { formula: `average(F20:F29)`, format: `$0.00` },
        H11: { formula: `'Savings per Month over 10yrs'` },
        I11: { formula: `C11-F11`, format: `$0.00` },

        B12: { formula: `'Average PG&E Bill 25yrs'` },
        C12: { formula: `average(C20:C44)`, format: `$0,0.00` },
        E12: { formula: `'Average Sunrun Bill 25yrs'` },
        F12: { formula: `average(F20:F44)`, format: `$0.00` },
        H12: { formula: `'Savings per Month over 25yrs'` },
        I12: { formula: `C13-F13`, format: `$0.00` },

        B15: { formula: `GRAPH(C20:C44, ['type=line', 'orientation=vertical'])` },
        E15: { formula: `GRAPH(F20:F44, ['type=line', 'orientation=vertical'])` },
        H15: { formula: `GRAPH(C20:F44, ['type=line', 'orientation=vertical'])` },

        B17: { formula: `'PG&E'` },
        E17: { formula: `'SUNRUN'` },
        H17: { formula: `'MONTHLY SAVINGS'` },

        B18: { formula: `'Rate per kWh'` },
        C18: { formula: `C5`, format: `$0,0.000` },
        E18: { formula: `'Rate per kWh'` },
        F18: { formula: `F5`, format: `$0,0.000` },

        B19: { formula: `'Annual Rate Increase'` },
        C19: { formula: `C6`, format: `0.0%` },
        E19: { formula: `'Inflation Escalator'` },
        F19: { formula: `F6`, format: `0.0%` },

        B20: { formula: `'Year 1 Bill'` },
        C20: { formula: `C9`, format: `$0,0.00` },
        E20: { formula: `'Year 1 Bill'` },
        F20: { formula: `F9`, format: `$0,0.00` },
        H20: { formula: `C20-F20`, format: `$0,0.00` },

        B45: { formula: `'25 Years Cost'` },
        C45: { formula: `SUM(C20:C44)`, format: `$0,0.00` },
        E45: { formula: `'25 Years Cost'` },
        F45: { formula: `SUM(F20:F44)`, format: `$0,0.00` },
        H45: { formula: `SUM(H20:H44)`, format: `$0,0.00` },
    }

    for (let breakdown = 21; breakdown <= 44; breakdown++) {
        const rMin1 = breakdown - 1;
        datamonthly[`B${breakdown}`] = { value: breakdown - 19 }
        datamonthly[`C${breakdown}`] = { formula: `C${rMin1}*(1+C19)`, format: `$0,0.00` }
        datamonthly[`E${breakdown}`] = { value: breakdown - 19 }
        datamonthly[`F${breakdown}`] = { formula: `F${rMin1}*(1+F19)`, format: `$0,0.00` }
        datamonthly[`H${breakdown}`] = { formula: `C${breakdown}-F${breakdown}`, format: `$0,0.00` }
    }

    jQuery(`#monthly`).calx({ data: datamonthly });

    for (let blue = 4; blue <= 9; blue++) {
        jQuery(`#monthly [data-cell="E${blue}"]`).addClass(`sps-bgblue`).addClass(`sps-textwhite`)
        jQuery(`#monthly [data-cell="F${blue}"]`).addClass(`sps-bgblue`).addClass(`sps-textwhite`)
    }

    for (let r1719 = 17; r1719 <= 19; r1719++) {
        jQuery(`#monthly [data-cell="B${r1719}"]`).addClass(`sps-bgred`)
        jQuery(`#monthly [data-cell="C${r1719}"]`).addClass(`sps-bgred`)
        jQuery(`#monthly [data-cell="E${r1719}"]`).addClass(`sps-bglightblue`)
        jQuery(`#monthly [data-cell="F${r1719}"]`).addClass(`sps-bglightblue`)
    }
})