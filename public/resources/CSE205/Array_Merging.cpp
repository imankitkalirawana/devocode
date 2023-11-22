// Merging Two given sorted array and return the merged array

#include <bits/stdc++.h>
using namespace std ;

int* mergeArray(int *A, int *B, int m, int n) {
    int i = 0, j = 0, k = 0;
    int *newArr = new int[m+n]; 
    while (i < m && j < n) {
        if (A[i] < B[j]) {
            newArr[k] = A[i];
            ++i, ++k;
        }
        else {
            newArr[k] = B[j];
            ++j, ++k;
        }
    }
    if (i == m) {
        while (j < n) {
            newArr[k] = B[j];
            ++j, ++k;
        }
    }
    if (j == n) {
        while (i < m) {
            newArr[k] = A[i];
            ++i, ++k;
        }
    }
    return newArr;
}

void traversal(int *A, int n) {
    for (int i = 0; i < n; ++i)
    {
        cout << A[i] << " ";
    }
    cout << endl;
}

int main () {
    int A[] = {4, 5, 8, 10, 15, 25};
    int B[] = {1, 4, 6, 9, 11, 33};

    int m = 6, n = 6;

    traversal(A, m);
    traversal(B, n);

    int *Arr = mergeArray(A, B, m, n);
    traversal(Arr, m+n);
    
    return 0;
}