/* polyfill */

if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

// end polyfill

function rgbToHsv(color_rgb) {
    var color_hsv = {h : 0, s : 0, v : 0};

    //remove spaces from input RGB values, convert to int

    var percentage_r = color_rgb.r / 255;
    var percentage_g = color_rgb.g / 255;
    var percentage_b = color_rgb.b / 255;

    var minRGB = Math.min(percentage_r, Math.min(percentage_g, percentage_b));
    var maxRGB = Math.max(percentage_r, Math.max(percentage_g, percentage_b));

    // Grayscale
    if (minRGB === maxRGB) {
        color_hsv.v = minRGB;
    }

    // Not grayscale

    var hue_difference;
    var shift_value;

    if (percentage_r === minRGB) {
        hue_difference = percentage_g - percentage_b;
        shift_value = 3;
    } else if (percentage_b === minRGB) {
        hue_difference = percentage_g;
        shift_value = 1;
    } else {
        hue_difference = percentage_b - percentage_r;
        shift_value = 5;
    }

    color_hsv.h = 60*(shift_value - hue_difference /(maxRGB - minRGB));
    color_hsv.s = (maxRGB - minRGB)/maxRGB;
    color_hsv.v = maxRGB;

    return color_hsv;
}

function hexToRgb(hex) {
    var rgb_color = {};

    rgb_color.r = parseInt(hex.slice(0, 2), 16);
    rgb_color.g = parseInt(hex.slice(2, 4), 16);
    rgb_color.b = parseInt(hex.slice(4, 6), 16);

    return rgb_color;
}

function swap(list, a, b) {
    var temp = list[a];
    list[a] = list[b];
    list[b] = temp;

    return list;
}

function bubbleSort(list, ascending) {
    var steps = [list.slice()];

    if (ascending) {
        do {
            var swapped = false;

            for (var i = 0; i < list.length - 1; i++) {
                if (list[i] > list[i + 1]) {
                    list = swap(list.slice(), i, i + 1);
                    swapped = true;
                }
            }

            if (swapped === false) {
                break;
            }

            steps.push(list.slice());

        } while (swapped);

    } else {
        do {
            var swapped = false;

            for (var i = 0; i <= list.length - 1; i++) {
                console.log('comparing', list[i], list[i + 1])
                if (list[i] < list[i + 1]) {
                    list = swap(list.slice(), i, i + 1);
                    swapped = true;
                }
            }

            if (swapped === false) {
                break;
            }

            steps.push(list.slice());

        } while (swapped);
    }

    console.log(steps);
    return steps;

}

function cocktailShakerSort(list, ascending) {
    var steps = [list.slice()];

    if (ascending) {
        do {
            var swapped = false;
            for (var i = 0; i < list.length - 2; i++) {
                if (list[i] > list[i + 1]) {
                    list = swap(list.slice(), i, i + 1);
                    swapped = true;
                }
            }

            if (swapped === false) {
                break;

            } else {
                for (var i = list.length - 2; i > 0; i--) {
                    if (list[i] > list[i + 1]) {
                        list = swap(list.slice(), i, i + 1);
                        swapped = true;
                    }
                }
            }

            steps.push(list.slice());
        } while (swapped);

    } else {
        do {
            var swapped = false;

            for (var i = 0; i <= list.length - 2; i++) {
                console.log('comparing', list[i], list[i + 1])
                if (list[i] < list[i + 1]) {
                    list = swap(list.slice(), i, i + 1);
                    swapped = true;
                }
            }

            if (swapped === false) {
                break;

            } else {
                for (var i = list.length - 2; i >= 0; i--) {
                    console.log('comparing', list[i], list[i + 1])

                    if (list[i] < list[i + 1]) {
                        list = swap(list.slice(), i, i + 1);
                        swapped = true;
                    }
                }

                steps.push(list.slice());
            }

        } while (swapped);
    }

    console.log(steps);
    return steps;
}

function insertionSort(list, ascending) {
    var steps = [list.slice()];

    if (ascending) {
        for (var i = 0; i < list.length; i++) {
            var j = i;

            while (j > 0 && list[j - 1] > list[j]) {
                list = swap(list.slice(), j, j - 1);
                j--;
            }

            steps.push(list.slice());
        }
    } else {
        for (var i = 0; i < list.length; i++) {
            var j = i - 1;

            while (j >= 0 && list[j] < list[j + 1]) {
                list = swap(list.slice(), j, j + 1);
                j--;
            }
            console.log(list.toString());
            steps.push(list.slice());
        }
    }

    return steps;
}

function mapColors(mode, rgb_colors) {
    var color_map = {original_order: []};

    var hsv_modes = ['hue', 'saturation', 'value'];
    var rgb_modes = ['red', 'green', 'blue'];

    if (rgb_modes.includes(mode)) {
        for (var i = 0; i < rgb_colors.length; i++) {
            if (mode === 'red') {
                color_map.original_order.push(rgb_colors[i].r);

                if (rgb_colors[i].r in color_map) {
                    color_map[rgb_colors[i].r].push(rgb_colors[i]);
                } else {
                    color_map[rgb_colors[i].r] = [rgb_colors[i]];
                }

            } else if (mode === 'green') {
                color_map.original_order.push(rgb_colors[i].g);

                if (rgb_colors[i].g in color_map) {
                    color_map[rgb_colors[i].g].push(rgb_colors[i]);
                } else {
                    color_map[rgb_colors[i].g] = [rgb_colors[i]];
                }

            } else if (mode === 'blue') {
                color_map.original_order.push(rgb_colors[i].b);

                if (rgb_colors[i].b in color_map) {
                    color_map[rgb_colors[i].b].push(rgb_colors[i]);
                } else {
                    color_map[rgb_colors[i].b] = [rgb_colors[i]];
                }
            }
        }
    } else if (hsv_modes.includes(mode)) {
        for (var i = 0; i < rgb_colors.length; i++) {
            var hsv_color = rgbToHsv(rgb_colors[i]);

            if (mode === 'hue') {
                color_map.original_order.push(hsv_color.h);

                if (hsv_color.h in color_map) {
                    color_map[hsv_color.h].push(rgb_colors[i]);
                } else {
                    color_map[hsv_color.h] = [rgb_colors[i]];
                }

            } else if (mode === 'saturation') {
                color_map.original_order.push(hsv_color.s);

                if (hsv_color.s in color_map) {
                    color_map[hsv_color.s].push(rgb_colors[i]);
                } else {
                    color_map[hsv_color.s] = [rgb_colors[i]];
                }

            } else if (mode === 'value') {
                color_map.original_order.push(hsv_color.v);

                if (hsv_color.v in color_map) {
                    color_map[hsv_color.v].push(rgb_colors[i]);
                } else {
                    color_map[hsv_color.v] = [rgb_colors[i]];
                }

            }
        }
    }

    return color_map;
}

function colorsFromValueSequence(sorted_values, map) {
    var unique_values = [];
    var color_list = [];

    for (var i = 0; i < sorted_values.length; i++) {
        if (unique_values.includes(sorted_values[i]) === false) {
            unique_values.push(sorted_values[i]);
        }
    }

    for (var i = 0; i < unique_values.length; i++) {
        for (var j = 0; j < map[unique_values[i]].length; j++) {
            color_list.push(map[unique_values[i]][j]);
        }
    }

    return color_list;
}

function setInputOutlineColors() {
    var color_selectors = document.getElementsByClassName('color-select');

    for (var i = 0; i < color_selectors.length; i++) {
	var color_rgb = hexToRgb(color_selectors[i].value);
	color = "rgb(" + color_rgb.r + "," + color_rgb.g + "," + color_rgb.b + ")";
        color_selectors[i].style.borderColor = color;
    }
}

function generateScarfPattern() {
    var color_selectors = document.getElementsByClassName('color-select');
    var ascending = true;
    var colors = [];
    var sorting_algorithm = document.getElementById('algorithm').value;
    var sort_by = document.getElementById('sort-by').value;
    var sort_sequence;

    if (document.getElementById('order').value === 'descending') {
        ascending = false;
    }

    for (var i = 0; i < color_selectors.length; i++) {
        colors.push(hexToRgb(color_selectors[i].value));
    }

    var color_map = mapColors(sort_by, colors);

    if (sorting_algorithm === 'insertion_sort') {
        sort_sequence = insertionSort(color_map.original_order, ascending);
    } else if (sorting_algorithm === 'cocktail_shaker_sort') {
        sort_sequence = cocktailShakerSort(color_map.original_order, ascending)
    } else if (sorting_algorithm === 'bubble_sort') {
        sort_sequence = bubbleSort(color_map.original_order, ascending)
    }

    var scarf_pattern = [];

    for (var i = 0; i < sort_sequence.length; i++) {
        scarf_pattern.push(...colorsFromValueSequence(sort_sequence[i], color_map));
    }

    return scarf_pattern;
}


