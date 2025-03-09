jQuery(document).ready(() => {
    const data = {
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
        // B19: { formula: `1` },
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
        data[`B${breakdown}`] = { value: breakdown - 18 }
        data[`C${breakdown}`] = { formula: `C${rMin1}*(1+C18)`, format: `$0,0.00` }
        data[`E${breakdown}`] = { value: breakdown - 18 }
        data[`F${breakdown}`] = { formula: `F${rMin1}*(1+F18)`, format: `$0,0.00` }
        data[`H${breakdown}`] = { formula: `C${breakdown}-F${breakdown}`, format: `$0,0.00` }
    }

    jQuery(`#solar-ppa-savings`).calx({ data });

    for (let blue = 4; blue <= 10; blue++) {
        jQuery(`[data-cell="E${blue}"]`).addClass(`sps-bgblue`).addClass(`sps-textwhite`)
        jQuery(`[data-cell="F${blue}"]`).addClass(`sps-bgblue`).addClass(`sps-textwhite`)
    }

    for (let r1618 = 16; r1618 <= 18; r1618++) {
        jQuery(`[data-cell="B${r1618}"]`).addClass(`sps-bgred`)
        jQuery(`[data-cell="C${r1618}"]`).addClass(`sps-bgred`)
        jQuery(`[data-cell="E${r1618}"]`).addClass(`sps-bglightblue`)
        jQuery(`[data-cell="F${r1618}"]`).addClass(`sps-bglightblue`)
    }

})