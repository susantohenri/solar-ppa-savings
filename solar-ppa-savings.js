jQuery(document).ready(() => {
    const data25yr = {
        B2: { formula: `'PG&E'` },
        E2: { formula: `'SUNRUN'` },
        H2: { formula: `'SAVINGS'` },

        B4: { formula: `'Annual kWh Usage*'` },
        E4: { formula: `'Annual System kWh'` },

        B5: { formula: `'Average Rate per kWh'` },
        E5: { formula: `'Sunrun kWh Rate'` },
        H5: { formula: `'Rate Savings'` },
        I5: { formula: `1-(F5/C5)`, format: `0%` },

        B6: { formula: `'PG&E Annual Rate Increase %'` },
        E6: { formula: `'Inflation Escalator'` },
        H6: { formula: `'Cash Savings'` },
        I6: { formula: `(C10 - F10) / C10`, format: `0%` },// additional request outside spreadsheet

        E7: { formula: `'Monthly Solar'` },
        F7: { formula: `if(F4<1,C4*F5/12,F4*F5/12)`, format: `$0.00` },

        B8: { formula: `'Avg kWh per month'` },
        C8: { formula: `C4/12`, format: `0` },
        E8: { formula: `'Monthly Battery'` },

        B9: { formula: `'Monthly Electricity Payments'` },
        C9: { formula: `C8*C5`, format: `$0.00` },
        E9: { formula: `'Monthly Payment'` },
        F9: { formula: `F7+F8`, format: `$0.00` },
        H9: { formula: `'Monthly Savings'` },
        // I9: { formula: `(H44/25)/12`, format: `$0.00` }, from original spreadsheet
        // I9: { formula: `(C10/12) - (F10/12)`, format: `$0.00` }, from explanation rtf
        I9: { formula: `CEILING(C9-F9, 0.01)`, format: `$0.00` }, // from monthly sheet

        B10: { formula: `'Annual Electricity Payments'` },
        C10: { formula: `C9*12`, format: `$0,0.00` },
        E10: { formula: `'Annual Payment'` },
        F10: { formula: `F9*12`, format: `$0,0.00` },
        H10: { formula: `'Annual Savings'` },
        // I10: { formula: `H44/25`, format: `$0,0.00` }, from original spreadsheet
        I10: { formula: `C10 - F10`, format: `$0,0.00` }, // revision by chat

        B12: { formula: `'Total PG&E Spend 25yrs'` },
        C12: { formula: `C44`, format: `$0,0.00` },
        E12: { formula: `'Total Sunrun Spend 25yrs'` },
        F12: { formula: `F44`, format: `$0,0.00` },
        H12: { formula: `'Lifetime Savings'` },
        I12: { formula: `C12-F12`, format: `$0,0.00` },

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

        B48: { formula: `'25 Years Cost'` },
        C48: { formula: `SUM(C19:C43)`, format: `$0,0.00` },
        E48: { formula: `'25 Years Cost'` },
        F48: { formula: `SUM(F19:F43)`, format: `$0,0.00` },
        H48: { formula: `SUM(H19:H43)`, format: `$0,0.00` },
    }

    let yssIndex = 1
    let yssRow = 19
    let ythrough = 5
    let initialYTrough = 19
    while (yssRow <= 47) {
        let rMin1 = yssRow - 1;
        if (1 === yssIndex) {
            data25yr[`B${yssRow}`] = { value: yssIndex }
            data25yr[`C${yssRow}`] = { formula: `C10`, format: `$0,0.00` }
            data25yr[`E${yssRow}`] = { value: yssIndex }
            data25yr[`F${yssRow}`] = { formula: `F9*12`, format: `$0,0.00` }
            data25yr[`H${yssRow}`] = { formula: `C19-F19`, format: `$0,0.00` }
            yssIndex++;
        } else if ([24, 30, 36, 42].includes(yssRow)) {
            data25yr[`B${yssRow}`] = { value: `Total through ${ythrough} Years` }
            data25yr[`C${yssRow}`] = { formula: `SUM(C${initialYTrough}:C${rMin1})`, format: `$0,0.00` }
            data25yr[`E${yssRow}`] = { value: `Total through ${ythrough} Years` }
            data25yr[`F${yssRow}`] = { formula: `SUM(F${initialYTrough}:F${rMin1})`, format: `$0,0.00` }
            data25yr[`H${yssRow}`] = { formula: `SUM(H${initialYTrough}:H${rMin1})`, format: `$0,0.00` }
            ythrough += 5
        } else {
            if ([25, 31, 37, 43].includes(yssRow)) {
                rMin1--;
                initialYTrough = yssRow
            }

            data25yr[`B${yssRow}`] = { value: yssIndex }
            data25yr[`C${yssRow}`] = { formula: `C${rMin1}*(1+C18)`, format: `$0,0.00` }
            data25yr[`E${yssRow}`] = { value: yssIndex }
            data25yr[`F${yssRow}`] = { formula: `F${rMin1}*(1+F18)`, format: `$0,0.00` }
            data25yr[`H${yssRow}`] = { formula: `C${yssRow}-F${yssRow}`, format: `$0,0.00` }
            yssIndex++;
        }
        yssRow++;
    }

    jQuery(`#yr25`).calx({
        data: data25yr,
        onAfterRender: () => {
            const b14 = `#yr25 td[data-cell="B14"]`
            const e14 = `#yr25 td[data-cell="E14"]`
            const h14 = `#yr25 td[data-cell="H14"]`
            const g1 = []
            const g2 = []

            for (let row = 20; row <= 43; row++) {
                if ([24, 30, 36, 42].includes(row)) continue;
                g1.push([
                    jQuery(`#yr25`).calx(`getCell`, `B${row}`).value,
                    jQuery(`#yr25`).calx(`getCell`, `C${row}`).computedValue,
                ])
                g2.push([
                    jQuery(`#yr25`).calx(`getCell`, `E${row}`).value,
                    jQuery(`#yr25`).calx(`getCell`, `F${row}`).computedValue,
                ])
            }

            jQuery(b14).html(``)
            jQuery.plot(b14, [g1], { yaxis: { max: 25000 } });

            jQuery(e14).html(``)
            jQuery.plot(e14, [g2], { yaxis: { max: 25000 } });

            jQuery(h14).html(``)
            jQuery.plot(h14, [g1, g2], { yaxis: { max: 25000 } });
        }
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
        B2: { formula: `'PG&E Monthly Payment'` },
        E2: { formula: `'SUNRUN Monthly Payment'` },
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

        B17: { formula: `'PG&E Monthly Payment'` },
        E17: { formula: `'SUNRUN Monthly Payment'` },
        H17: { formula: `'MONTHLY SAVINGS'` },

        B18: { formula: `'Rate per kWh'` },
        C18: { formula: `C5`, format: `$0,0.000` },
        E18: { formula: `'Rate per kWh'` },
        F18: { formula: `F5`, format: `$0,0.000` },

        B19: { formula: `'Annual Rate Increase'` },
        C19: { formula: `C6`, format: `0.0%` },
        E19: { formula: `'Inflation Escalator'` },
        F19: { formula: `F6`, format: `0.0%` },

        B45: { formula: `'25 Years Cost'` },
        C45: { formula: `SUM(C20:C44)`, format: `$0,0.00` },
        E45: { formula: `'25 Years Cost'` },
        F45: { formula: `SUM(F20:F44)`, format: `$0,0.00` },
        H45: { formula: `SUM(H20:H44)`, format: `$0,0.00` },
    }

    let mpcIndex = 1
    let mpcRow = 20
    let mtrough = 5
    let initialMTrough = 20
    while (mpcRow <= 48) {
        let rMin1 = mpcRow - 1;
        if (1 === mpcIndex) {
            datamonthly[`B${mpcRow}`] = { value: mpcIndex }
            datamonthly[`C${mpcRow}`] = { formula: `C9`, format: `$0,0.00` }
            datamonthly[`E${mpcRow}`] = { value: mpcIndex }
            datamonthly[`F${mpcRow}`] = { formula: `F9`, format: `$0,0.00` }
            mpcIndex++;
        } else if ([24, 30, 36, 42].includes(mpcRow)) {
            datamonthly[`B${mpcRow}`] = { value: `Total Through ${mtrough} Years` }
            datamonthly[`C${mpcRow}`] = { formula: `SUM(C${initialMTrough}:C${rMin1})`, format: `$0,0.00` }
            datamonthly[`E${mpcRow}`] = { value: `Total Through ${mtrough} Years` }
            datamonthly[`F${mpcRow}`] = { formula: `F${rMin1}*(1+F19)`, format: `$0,0.00` }
            mtrough += 5
        } else {
            if ([25, 31, 37, 43].includes(mpcRow)) {
                rMin1--;
                initialMTrough = mpcRow
            }

            datamonthly[`B${mpcRow}`] = { value: mpcIndex }
            datamonthly[`C${mpcRow}`] = { formula: `C${rMin1}*(1+C19)`, format: `$0,0.00` }
            datamonthly[`E${mpcRow}`] = { value: mpcIndex }
            datamonthly[`F${mpcRow}`] = { formula: `F${rMin1}*(1+F19)`, format: `$0,0.00` }
            mpcIndex++;
        }
        mpcRow++;
    }

    for (let upperMonthly = 2; upperMonthly <= 15; upperMonthly++) {
        jQuery(`#monthly td[data-cell="A${upperMonthly}"]`).parent().hide()
    }
    jQuery(`#monthly td[data-cell="A45"]`).parent().hide()// lower monthly
    for (let rightMonthly = 17; rightMonthly <= 45; rightMonthly++) {
        jQuery(`#monthly td[data-cell="H${rightMonthly}"]`).hide()
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

    document.getElementById("download-pdf").addEventListener("click", function () {
        const element = document.getElementById("generate-pdf");
        jQuery(element).find(`input[type="text"]`).each(function () {
            const input = jQuery(this)
            input.parent(`td`).append(`<span>${input.val()}</span>`).addClass(`sps-textright`)
            input.hide()
        })
        const options = {
            margin: 0.15,
            filename: 'Solar PPA Savings.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { dpi: 192, letterRendering: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf(element, options);
        setTimeout(() => {
            jQuery(element).find(`input[type="text"]`).each(function () {
                const input = jQuery(this)
                input.parent(`td`).find(`span`).remove()
                input.show()
            })
        }, 1000)
    });

})