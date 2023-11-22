// Array Traversal 

#include <bits/stdc++.h>
using namespace std ;

// Function to create and set the array 
int setArr (int *Arr, int &n) {
    int x; 
    cout << "Enter the number of elements: ";
    cin >> x ;

    // Cannot enter more elements than available size
    if (x >= n) {
        cout << "Not enough space" << endl;
        return -1;
    }
    // Take user input 
    for (int i = 0; i < x; ++i)
    {
        cout << "Enter Element " << i + 1 << " : ";
        cin >> Arr[i] ;
    }
    // Return number of elements in array.
    return x ;
}

// Traversal Function : Traverse and print 
void traverseArray(int *A, int &x, int &n) {
    for (int i = 0; i < x; ++i)
    {
        cout << A[i] << " " ;
    }
    cout << endl;
}

int main () {
    int n ;
    cout << "Enter size of array: " ;
    cin >> n;

    int *Arr = new int[n];

    int x = setArr(Arr, n);
    traverseArray(Arr, x, n);

    return 0;
}
