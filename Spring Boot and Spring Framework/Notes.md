# Spring Boot 3 and Spring Framework 6

## Terminology

### Tightly Coupled Code
- **Definition**: Tightly coupled code refers to a scenario where components (classes, modules, functions) are heavily dependent on each other.
- **Characteristics**:
  - Changing one component often requires changes to several other components.
  - Components are hard to reuse because they have so many dependencies on other components.
  - Makes the system harder to understand, maintain, and extend.

### Simple Code Example:

```python
# Example of tightly coupled code

class HardDrive:
    def store_data(self, data):
        print(f"Storing data: {data}")

class Computer:
    def __init__(self):
        # Direct dependency on the HardDrive class
        self.hard_drive = HardDrive()

    def save_data(self, data):
        self.hard_drive.store_data(data)

# Using the Computer class to save data
computer = Computer()
computer.save_data("Some important data")
```

Breaking Change Requirement:
Now, we want the Computer class to support saving data to a cloud service, not just a hard drive. This requirement cannot be met without modifying the Computer class because of its tight coupling with the HardDrive class.

```python
class CloudStorage:
    def store_data(self, data):
        print(f"Saving data to cloud: {data}")

# Attempt to modify Computer class to use CloudStorage instead of HardDrive
class Computer:
    def __init__(self):
        # Now tightly coupled to CloudStorage, but what if we need both options?
        self.storage = CloudStorage()

    def save_data(self, data):
        self.storage.store_data(data)

# Using the modified Computer class to save data to the cloud
computer = Computer()
computer.save_data("Some important data")
```

Problems:
The Computer class is still tightly coupled, but now to CloudStorage instead of HardDrive.
Any change in storage options requires modifications to the Computer class.
This design does not support multiple storage options (e.g., both hard drive and cloud storage) without further complicating the Computer class.