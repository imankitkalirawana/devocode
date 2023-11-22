// Array Insertion

#include <bits/stdc++.h>
using namespace std;

// Function to create and set the array
int setArr(int *Arr, int &n)
{
    int x;
    cout << "Enter the number of elements: ";
    cin >> x;

    // Cannot enter more elements than available size
    if (x >= n)
    {
        cout << "Not enough space" << endl;
        return -1;
    }
    // Take user input
    for (int i = 0; i < x; ++i)
    {
        cout << "Enter Element " << i + 1 << " : ";
        cin >> Arr[i];
    }
    // Return number of elements in array.
    return x;
}

int insertElement(int *Arr, int &x, int &n)
{
    // Step1: Check if space is available
    if (x == n)
    {
        cout << "Array overflow" << endl;
        return -1;
    }

    // Take input from user: Index and element
    int ind, element;
    cout << "Enter the index to insert the element: ";
    cin >> ind;
    cout << "Enter the element to insert: ";
    cin >> element;

    // Check if inserted element is within range [0, x]
    if (ind > x) {
        cout << "Index out of range: " << endl;
        return -1;
    }

    // Step2: Shift all the elements to the right
    for (int i = x; i > ind; --i)
    {
        Arr[i] = Arr[i-1];
    }

    // Step3: Insert the element at the given index
    Arr[ind] = element;

    // Step4: Update the number of elements in the arr
    ++x;

    // Sucessful insertion
    return 1;
}

void traverseArray(int *A, int &x, int &n)
{
    for (int i = 0; i < x; ++i)
    {
        cout << A[i] << " ";
    }
    cout << endl;
}

int main()
{
    int n;
    cout << "Enter size of array: ";
    cin >> n;

    int *Arr = new int[n];

    int x = setArr(Arr, n);
    traverseArray(Arr, x, n);
    if (insertElement(Arr, x, n))
    {
        cout << "Insertion Sucessful" << endl;
        traverseArray(Arr, x, n);
    }
    else {
        cout << "Insertion Failed";
    }

    return 0;
}
