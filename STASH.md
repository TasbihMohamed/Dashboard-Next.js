1. **Save a Stash:**
   ```bash
   git stash save "Work in progress on feature XYZ"
   ```
   This command saves a stash with the message "Work in progress on feature XYZ."

2. **Save Another Stash:**
   ```bash
   git stash save "Bugfix for issue #123"
   ```
   This command saves another stash with a different message.

3. **List Stashes:**
   ```bash
   git stash list
   ```
   The output might look like:
   ```
   stash@{0}: On branch_name: Bugfix for issue #123
   stash@{1}: On branch_name: Work in progress on feature XYZ
   ```

4. **Apply a Specific Stash by Index:**
   To apply the stash with the message "Work in progress on feature XYZ," you can use the stash index:
   ```bash
   git stash apply stash@{1}
   ```
   Here, `stash@{1}` corresponds to the index of the stash with the message "Work in progress on feature XYZ."

Remember that stash indices start from 0 for the most recent stash and increment with each new stash. Adjust the index accordingly based on your actual stashes and their order.
