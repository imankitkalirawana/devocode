// Binary Search in sorted array
// Array must be sorted for binary search 

// Time Complexity: 
//     Best Case: O(1): Item found at mid 
//     Avg Case: O(log n)
//     Worst Case: Item not found or found when st == last

#include <bits/stdc++.h>
using namespace std ;

int binarySearch (int *Arr, int n, int element) {
    // Step1: Initialise st, last and mid
    int st = 0, last = n-1;
    int mid = st + (last - st) / 2;

    // Step2: Loop Through the arr
    while (st <= last) {
        // Return index if element is found 
        if (Arr[mid] == element) return mid;
        // if Arr[mid] is greater than element, eliminate the second half
        else if (Arr[mid] > element) last = mid-1;
        // if Arr[mid] is lesser than element, eliminate the first half of arr
        else st = mid + 1;

        // Update mid 
        mid = st + (last - st) / 2;
    }

    // Return -1 if element is not found, since -1 as index is not possible.
    return -1;
}

int main () {
    int Arr[] = {2, 43, 54, 67, 86, 101, 324, 543}, n = 8;

    int element ;
    cout << "Enter the element to search: " ;
    cin >> element;

    int result = binarySearch(Arr, n, element);
    if (result == -1) {
        cout << "Element not found !!" << endl;
    }
    else {
        cout << "Element is found at " << result << " index" << endl; 
    }

    return 0;
}