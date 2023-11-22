// Linear Search in Array

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

// Linear Search 
int linearSearch(int *Arr, int &x, int &n) {
    // Take input from user
    int element;
    cout << "Enter element for search: " ;
    cin >> element;

    for (int i = 0; i < x; ++i)
    {
        if (element == Arr[i]) {
            return i;
        }
    }
    return -1;
}

int main () {
    int n ;
    cout << "Enter size of array: " ;
    cin >> n;

    int *Arr = new int[n];

    int x = setArr(Arr, n);
    traverseArray(Arr, x, n);

    int ind = linearSearch(Arr, x, n);
    if (ind) {
        cout << "Element found at " << ind << " index" << endl;
    }
    else {
        cout << "Element not found";
    }
    
    return 0;
}
